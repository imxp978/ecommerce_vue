import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  const notice = ref(false);
  const itemAdded = ref(false);

  // 計算總價
  function sum () {
    let total = 0;
    cart.value.forEach((item) => {
      total += item.price * item.quantity;
    });
    return parseFloat(total).toFixed(2);
  };

  function addToCart(product, quantity) {
    // console.log('addToCart:', cart.value);
    // console.log('addToCart_product: ', product);
    // console.log('addToCart_quantity: ', quantity);

    if (product.p_qty >= quantity) {
      const cartIndex = cart.value.findIndex((item) => item.id === product.p_id);
      if (cartIndex === -1) {
        cart.value.push({
          id: product.p_id,
          title: product.p_name,
          price: product.p_price,
          image: product.img[0]['img_file'],
          quantity: +quantity,
        });
      } else {
        cart.value[cartIndex].quantity += parseInt(quantity);
      }
      itemAddedToCart();
    }
  }

  function itemAddedToCart() {
    setTimeout(addedToCart, 200);
    setTimeout(addedToCart, 1000);
  }

  function addedToCart() {
    notice.value = !notice.value;
    itemAdded.value = !itemAdded.value;
  }

  function checkCart() {
    return cart.value.length === 0;
  }

  function checkQuantity(item) {
    if (item.quantity === 0) {
      delItem(item);
    }
  }


  function delItem(item) {
    const delIndex = cart.value.findIndex((cartItem) => cartItem.id === item.id);
    if (delIndex !== -1) {
      if (confirm('Remove this item?')) {
        cart.value.splice(delIndex, 1);
      }
    }
  }

  function countItem () {
    return cart.value.reduce((acc, item) => acc + parseInt(item.quantity), 0);
  };

  return {
    cart,
    notice,
    itemAdded,
    sum,
    addToCart,
    itemAddedToCart,
    addedToCart,
    checkCart,
    checkQuantity,
    delItem,
    countItem,
  };
});