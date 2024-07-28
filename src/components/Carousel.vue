<template>
  <section id="carousel">
    <div class="container">
      <div
        id="carouselExampleCaptions"
        class="carousel slide movable slideIn"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            v-for="(item, index) in carousels"
            :key="index"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-current="{ true: index === 0 }"
            :aria-label="'Slide ' + index"
          ></button>
        </div>
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(item, index) in carousels"
            :key="item.id"
            :class="{ active: index === 0 }"
          >
            <img
              :src="`/images/carousel_images/${item.caro_pic}`"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <!-- <h5>{{ item.title }}</h5>
              <p>{{ item.content }}</p> -->
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        <hr />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const carousels = ref([]);
let url = 'http://localhost:8888/git-files/frontend/ecommerce';
url = '.';

async function getCarousel() {
  try {
    const response = await axios.get(`${url}/controllers/getCarousel.php`);
    if (response.data.success) {
      // console.log(response.data.carousels);
      carousels.value = response.data.carousels;
    } 
  }catch (error) {
    console.log('error: ', error);
  }
}

onMounted(()=>{
  getCarousel();
})

</script>

<style></style>
