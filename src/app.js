document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
     items: [
       { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000},
       { id: 2, name: 'Arabica Blend', img: '1.img.jpg', price: 50000},
       { id: 3, name: 'Primo Passo', img: '2.img.jpg', price: 5000},
       { id: 4, name: 'Snake', img: '4.img', price: 50000},
       { id: 5, name: 'Roti', img: '5.img', price: 50000},
      ],
    }));

    Alpine.store('cart', {
      items: [],
      total: 0,
      quantity: 0,
      isNameValid: false,
      
      validateName(event) {
        this.isNameValid = event.target.value.trim() !== '';
      },
      add(newItem) {
        const cartItem = this.items.find((item) => item.id === newItem.id);

        if (!cartItem) {
          this.items.push({...newItem, quantity: 1, total: newItem.price});
          this.quantity++;
          this.total += newItem.price;
        } else {
          this.items = this.items.map((item) => {
            if (item.id !== newItem.id) {
              return item;
            } else {
              item.quantity++;
              item.total = item.price * item.quantity;
              this.total += item.price;
              return item;
            }
          });
        }
      },
      increaseQuantity(index) {
        const item = this.items[index];
        item.quantity++;
        item.total = item.price * item.quantity;
        this.total += item.price;
      },
      decreaseQuantity(index) {
        const item = this.items[index];
        if (item.quantity > 1) {
          item.quantity--;
          item.total = item.price * item.quantity;
          this.total -= item.price;
        } else {
          this.items.splice(index, 1);
          this.quantity--;
          this.total -= item.price;
        }
      }
    });
});

//price Rp
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};