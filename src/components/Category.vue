<template>
  <section id="products">
    <div class="container px-5 text-center" py-5>
      <h3 class="my-5 movable slideIn">CATEGORY</h3>
      <div class="row my-3" v-if=" productsByCategory.length > 0">
        <div
          class="card col-sm-12 col-md-6 col-lg-3 border-0 gx-5 gy-5"
          v-for="item in productsByCategory" 
          :key="item.p_id"
        >
          <div class="card-image">
            <div class="card-modal" style="z-index: 1">
              <p>
                <RouterLink :to="{ name: 'product', params: { id: item.p_id }}">{{
                  item.p_name
                }}</RouterLink>
              </p>
            </div>
            <div class="category-image">
              <RouterLink :to="{ name: 'product', params: {id: item.p_id} }"
                ><img
                  :src="`/images/product_images/${item.img[0]['img_file']}`"
                  class="card-img-top"
                  alt="..."
              />
              </RouterLink>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ item.p_name }}</h5>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <p>No Product in This Category</p>
      </div>
      <hr />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/ProductStore.js';
import { useRoute } from 'vue-router';

const store = useProductStore();
const productsByCategory = ref([]);
const route = useRoute();
const categoryId = ref(parseInt(route.params.id));
// const products = ref([]);

onMounted(async () => {
  await store.getProducts();
  productsByCategory.value = store.getProductsByCategory(categoryId.value);
  // console.log('productsByCat: ', productsByCategory.value);

})

</script>

<style>
a {
  color: white;
  text-decoration: none;
}
a:hover {
  color: lightgray;
  text-decoration: none;
}
</style>
