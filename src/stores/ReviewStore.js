import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from 'axios';

export const useReviewStore = defineStore('Review', () => {
  const reviews = ref([]);
  
  let url = 'http://localhost:8888/git-files/frontend/ecommerce';
  url = '.';

  async function getReview () {
    try{
      const response = await axios.get(`${url}/controllers/getReview.php`);
      if (response.data.success) {
        reviews.value = response.data.reviews;
        // console.log(reviews.value);
      }
    } catch(error) {
      console.log('error: ', error);
    }
  }
  return { reviews, getReview}
})
