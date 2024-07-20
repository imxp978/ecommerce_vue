<template>
  <!-- <Product /> -->
  <section id="product" v-if="product">
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-center">
          <Transition>
            <div
              class="notice col-12 position-fixed d-flex justify-content-center"
              v-if="cartStore.notice"
            >
              <p class="mx-auto my-auto" v-if="cartStore.itemAdded">
                Added to cart <i class="fa-regular fa-circle-check"></i>
              </p>
            </div>
          </Transition>
        </div>

        <div class="col-12 col-lg-6">
          <div class="product_image">
            <swiper
              :spaceBetween="30"
              :centeredSlides="true"
              :autoplay="{
                delay: 1000,
                disableOnInteraction: false,
              }"
              :pagination="{
                clickable: true,
              }"
              :navigation="true"
              :modules="modules"
              :mousewheel="true" 
              :keyboard="true"
              :loop="true"
              class="mySwiper"
            >
              <swiper-slide v-for="i in product.img" :key="i.img_id">
                <img :src="`/images/product_images/${i.img_file}`" alt="">
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="container d-flex flex-column">
            <h4 class="my-5">{{ product.p_name }}</h4>
            <p class="fs-4 text-end">
              <i class="fa-solid fa-dollar-sign"></i> {{ product.p_price }}
            </p>
            <p v-if="product.p_qty >= 5" class="text-end">In Stock</p>
            <p
              v-else-if="product.p_qty > 0"
              class="text-end"
              style="color: orange"
            >
              Low Stock
            </p>
            <p v-else class="text-end" style="color: red">Out of Stock</p>
            <p>
              {{ product.p_content }}
            </p>
            <div class="row d-flex justify-content-center m-3">
              <select
                v-if="product.p_qty > 0"
                v-model="quantity"
                name="quantity"
                id="quantify"
                class="form-select m-3"
              >
                <option value="1" selected>1</option>
                <option v-for="(i, index) in product.p_qty - 1" :value="i + 1" :key="index">
                  {{ i + 1 }}
                </option>
              </select>
            </div>
            <button
              @click="cartStore.addToCart(product, quantity)"
              class="btn btn-dark m-3"
            >
              ADD TO CART <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
          <hr />
        </div>
        <div class="col-12 col-lg-6">
          <div class="container">
            <h5>SPEC</h5>
            <p>
              {{ product.p_spec }}
            </p>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="container">
            <h5>DESCRIPTION</h5>
            <p>
              {{ product.p_content }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/ProductStore.js";
import { useCartStore } from "@/stores/CartStore.js";

// data
const quantity = ref(1);
const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const productId = ref(parseInt(route.params.id));

const product = ref('');

onMounted(() => {
  const computedProduct = productStore.getProductById(productId.value);
  product.value = computedProduct.value;  
  // console.log('product: ', product.value);
});

const cart = cartStore.cart;

// swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';

const modules = [Autoplay, Pagination, Navigation, Mousewheel, Keyboard];

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
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.notice {
  background: rgba(0, 0, 0, 0.33);
  border-radius: 5px;
  width: 10vw;
  min-width: 150px;
  height: 10vh;
  z-index: 1;
  top: 50%;
  z-index: 9999;
}

.notice p {
  color: white;
}

</style>
