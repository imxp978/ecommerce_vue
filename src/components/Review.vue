<template>
  <section id="review" style="width: 100%">
    <div class="container text-center mx-auto px-5 py-5">
      <h3 class="my-5 movable slideIn">REVIEWS</h3>
      <div class="row gy-10 gx-5">


        <swiper
          :modules="modules"
          class="mySwiper"
          :slides-per-view="5"
          :space-between="50"
          loop
          :autoplay="{
            delay: 1000,
            disableOnInteraction: false,
          }"
         :breakpoints="{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50
            }
          }"
        >
          <swiper-slide>Placeholder1</swiper-slide>
          <swiper-slide 
            v-for="item in store.reviews"
            :key="item.id">
            <div class="swiper-slide">
              <div class="card col-12 border-0 border-end border-bottom border-3">
                <div class="row g-5">
                  <div class="review col-md-12">
                    <div class="review-image" >
                      <img :src="`/images/user_images/${item.image}`" class="img-fluid rounded-start" 
                        alt="..." />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="card-body text-start">
                      <h5 class="card-title">{{ item.title }}</h5>
                      <span v-for="i in item.rate" :key="i.id">
                        <i class="fa-solid fa-star"></i>
                      </span>
                      <p class="card-text">{{ item.content }}</p>
                      <p class="card-text">
                        <small class="text-muted">Last updated 3 mins ago</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>Placeholder2</swiper-slide>
          <swiper-slide>Placeholder3</swiper-slide>
        </swiper>
      </div>
      <hr/>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useReviewStore } from '@/stores/ReviewStore.js';

const store = useReviewStore();

onMounted(async () => {
  await store.getReview();
});

  import { Autoplay, A11y } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  const modules= [ Autoplay, A11y];

</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
