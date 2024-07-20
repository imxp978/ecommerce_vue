<template>
    <section id="products">
      <div class="container px-5 text-center" py-5>
        <h3 class="my-5 movable slideIn">PRODUCTS</h3>
        <div class="row my-3">
          <div
            class="card col-sm-12 col-md-6 col-lg-3 border-0 gx-5 gy-5 "
            v-for="item in store.products"
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
                /></RouterLink>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ item.p_name }}</h5>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useProductStore } from '@/stores/ProductStore.js';

  const store = useProductStore();

  onMounted(async () => {
    await store.getProducts();
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
  