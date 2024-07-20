import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('Product', () => {

  const products = ref([]);
  
  let url = 'http://localhost:8888/git-files/frontend/ecommerce'
  url = './'

  async function getProducts () {
    try {
      // const response = await axios.get(`${url}/controllers/getProducts.php`);
      const response = await axios.get('http://tsaochun.byethost7.com/controllers/getProducts.php');
      if (response.data.success) {
        products.value = response.data.products;
        // console.log(response.data.products)
        // console.log('getProducts: ',products.value);
      } else {
        console.error('error: ', error);
      }
    } catch (error) {
      console.error('error: ', error);
    }
  }
  
  const getProductById = (id) => {
    return computed(() => products.value.find((item) => item.p_id === id));
  };
  
  const getProductsByCategory = (id) => {
    const productsByCategory = products.value.filter((item)=> item.classid == id);
    // console.log('products.value: ',products.value);
    return productsByCategory;
  };

  return {
    products,
    getProducts,
    getProductById,
    getProductsByCategory,
  }
})
