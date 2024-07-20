import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('Auth', () => {
  const userName = ref('');
  const passWord = ref('');
  const message = ref('');
  const isAuth = ref(false);
  const router = useRouter();

  let url = 'http://localhost:8888/git-files/frontend/ecommerce/'
  url = './'

  async function login () {
    // console.log('store login called');

    try {
      // const response = await axios.post(`${url}controllers/login.php`, {
      const response = await axios.post('http://tsaochun.byethost7.com/controllers/login.php', {
        username : userName.value,
        password : passWord.value,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
      // console.log('response.data: ', response.data);
      if (response.data.success) {
        isAuth.value = true;
      } else {
        message.value = response.data.message;
      }

    } catch (error) {
      console.error('login error: ', error)
    }
  }

  function logout () {
    isAuth.value = false;
    userName.value = '';
    passWord.value = '';
    message.value = '';
  }

  return {
    userName,
    passWord,
    message,
    isAuth,
    login,
    logout,
  };
});