import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from 'axios';

export const useReviewStore = defineStore('Review', () => {
  const reviews = ref([]);
  
  let url = 'http://localhost:8888/git-files/frontend/ecommerce/';
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

// // import vue會用到的方法
// import { ref, computed } from 'vue'
// // 以解構的方是import pinia中defineStore的方法
// import { defineStore } from 'pinia'
// // 使用函式表達式命名與檔名一樣的變數並被defineStore('id',callback)賦值
// export const useCounterStore = defineStore('counter', () => {
//   // 等於option API的 state: () => { return {count:0}}  
//   const count = ref(0)
//   // 等於option API的getters: {doubleCount: (state) => state.counter * 2}
//   const doubleCount = computed(() => count.value * 2)
//   // 等於option API的actions: { increment(){this.count ++}}
//   function increment() {
//     count.value++
//   }
// // 與composition一樣要return
//   return { count, doubleCount, increment }
// })


// export const useReviewStore = defineStore("reviews", {
//   state: () => {
//     return { reviews: data.review };
//   },
// });
