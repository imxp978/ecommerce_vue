<template>
  <section id="category">
    <div class="container px-5 text-center" py-5>
      <h3 class="my-5 movable slideIn">CATEGORIES</h3>
      <div class="row my-3">
        <div
          class="card col-sm-12 col-md-6 col-lg-4 border-0 gx-5 gy-5 movable slideIn"
          v-for="item in categories"
          :key="item.classid"
        >
          <div class="card-image">
            <div class="card-modal" style="z-index: 1">
              <p>
                <RouterLink :to="{ name: 'category', params: { id: item.classid }}">{{ item.cname }}</RouterLink>
              </p>
            </div>
            <div class="category-image">
              <RouterLink :to="{ name: 'category', params: { id: item.classid }}"
                ><img
                  :src="`/images/category_images/${item.image}`"
                  class="card-img-top"
                  alt="..."
              /></RouterLink>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ item.cname }}</h5>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
const categories = ref([]);
let url = 'http://localhost:8888/git-files/frontend/ecommerce';
url = '.';

async function getCategory () {
  try { 
    const response = await axios.get(`${url}/controllers/getCategory.php`);
    if (response.data.success) {
      categories.value = response.data.categories;
      // console.log(response.data.categories);
    } 
  } catch(error) {
    console.log('error: ', error);
  }
}

onMounted(()=>{
  getCategory();
})
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
a:hover {
  color: lightgray;
  text-decoration: none;
}
</style>
