<template>
  <section id="modal">
<!-- login -->
    <div
      class="modal fade"
      id="login"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div v-if="!authStore.isAuth" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel">Log In</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div  class="modal-body">
            <div>
              Email:
              <input
                class="form-control m-1"
                type="text"
                autofocus 
                v-model="authStore.userName"
              />
              Password:
              <input class="form-control m-1" type="password" v-model="authStore.passWord"/>
            </div>
          </div>
          <div class="modal-footer">
            <p class="text-danger text-start">{{ authStore.message ? authStore.message : ''}}</p>
            <button
              class="btn btn-light"
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              @click="signUp0"
            >
              Sign Up
            </button>
            <button type="button" class="btn btn-dark" @click="authStore.login" >Log In</button>
          </div>
        </div>
        <div v-else class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel">Hi, {{authStore.userName}}</h5>
            
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-center">
            <p>You are now logged in</p>
            <p>:)</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-dark" @click='authStore.logout'>Log out</button>
          </div>
        </div>
      </div>
    </div>
    <!-- sign up -->
    <div
      class="modal fade"
      id="exampleModalToggle2"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel2">Sign Up</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              Email:
              <input
                class="form-control m-1"
                type="email"
                v-model="newEmail"
                autofocus
              />
              Password:
              <input class="form-control m-1" type="password"  v-model="newPassword1"/>
              Confirm Password:
              <input class="form-control m-1" type="password"  v-model="newPassword2"/>
            </div>
          </div>
          <div class="modal-footer">
            <p class="text-danger">{{ message }}</p>
            <button
              class="btn btn-dark"
              data-bs-target="#exampleModalToggle"
              @click="signUp"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
<!-- cart -->
    <div
      class="modal fade modal-lg mt-5"
      id="cart"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row d-flex justify-content-end">
              <div class="col-6 text-center">item</div>
              <div class="col-2 text-end">price</div>
              <div class="col-2 text-end">quantity</div>
              <div class="col-2 text-end">subtotal</div>
            </div>
            <hr />
            <Transition>
              <div v-show="cartStore.checkCart()" class="text-end">
                Cart is empty
              </div>
            </Transition>
            <ul>
              <li
                v-for="(item, index) in cartStore.cart"
                :key = "item.index"
                class="row d-flex justify-content-end align-items-baseline"
              >
                <div class="col-6 text-start">
                  <img
                    :src="`../images/product_images/${item.image}`"
                    width="50px"
                  />{{ item.title }}
                </div>
                <div class="col-2 text-end">$: {{ item.price }}</div>
                <div class="col-2 text-end">
                  <input
                    type="number"
                    class="form-control"
                    min="0"
                    v-model="item.quantity"
                    @change="cartStore.checkQuantity(item)"
                  />
                </div>
                <div class="col-2 text-end">
                  $: {{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </li>
            </ul>
            <hr />
            <li class="col-12 text-end d-flex justify-content-end">
              <div>Total $: {{ cartStore.sum() }}</div>
            </li>
          </div>
          <div class="modal-footer">
            <button v-if="authStore.isAuth && cartStore.cart.length > 0" type="button" class="btn btn-dark" data-bs-dismiss="modal" @click="checkOut">Checkout</button>
            <RouterLink v-else-if="authStore.isAuth" class="nav-link" :to="{ name: 'products' }">
              <button  type="button" class="btn btn-dark" data-bs-dismiss="modal">Go Shop</button>
            </RouterLink>
            <button v-else type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#login">Login to Checkout</button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

import { useAuthStore } from '@/stores/AuthStore.js';
const authStore = useAuthStore();

const newEmail = ref ('');
const newPassword1 = ref('');
const newPassword2 = ref('');
const message = ref('');

let url = 'http://localhost:8888/git-files/frontend/ecommerce';
url = '.';

function signUp0() {
  newEmail.value = '';
  newPassword1.value = '';
  newPassword2.value = '';
  message.value = '';
}

async function signUp() {
  authStore.userName = ''; 
  authStore.passWord = ''; 
  message.value = '';
  if (newEmail.value !='' && newPassword1.value !='' && newPassword2.value !='' ){
    if (newPassword1.value === newPassword2.value) {
      // console.log(newEmail.value)
      // console.log(newPassword1.value)
      try {
        // const response = await axios.post(`${url}/controllers/signUp.php`, {
        const response = await axios.post('https://ecommerce.work.tsaochun.com/controllers/signUp.php', {
            email:newEmail.value,
            password: newPassword1.value,
        },{
          headers: {
          'Content-Type': 'application/json'
          }
        });
        if (response.data.success) {
          message.value = 'Sign up success';
          authStore.userName = newEmail.value; 
          authStore.passWord = newPassword1.value; 
          authStore.isAuth = true; 

        } else {
          message.value = 'Sign up failed';
        }
      } catch(error) {
        console.log('error: ', error);
      }
    } else {
      message.value = "Password don't match";
    }
  } else {
    message.value = "Insert all fields";
  }
}

import { useCartStore } from "@/stores/CartStore.js";
const cartStore = useCartStore();
const cart = useCartStore().cart;

function checkOut() {
  cartStore.cart= [];
}

</script>

<style scoped>
.notice {
  background: rgba(0, 0, 0, 0.33);
  border-radius: 5px;
  width: 10vw;
  min-width: 150px;
  height: 10vh;
  z-index: 1;
  top: 50%;
}

.notice p {
  color: white;
  z-index: 9999;
}
</style>
