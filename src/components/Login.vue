<template>
  <div class="inline-flex flex-col text-white">
    <form class="inline-flex flex-col focus-within:text-green-600 mt-10 ml-28 loginForm" @submit.prevent="handleLogin">
        <label class="my-1">userName</label>
        <input
        class="border-blue-50 border-4 p-2 my-4 w-60"
        v-model="username"
        placeholder="enter userName" />
        <label class="my-1">password</label>
        <input
        class="border-blue-50 border-4 p-2 my-4" 
        v-model="password"
        placeholder="enter password"/>
        <input 
        class="border-blue-50 border-4 p-2 my-6"
            type="submit"
            value="save "/>
    </form>
  </div>
    
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useMutation } from '@vue/apollo-composable';
import { LOGIN } from '../utils/mutations.js';
const username = ref('')
const password = ref('')
import { useStore } from "vuex";
const store = useStore();
const { mutate: login, onDone } = useMutation(LOGIN);
const emit = defineEmits(['handleUserlogin'])

const handleLogin = async () => {
  try {
    const { data } = await login({ username: username.value, password: password.value });
    const {token, user } = data.login
    localStorage.setItem('idToken', token)

    console.log('Login successful. Token:', token, 'User:', user);
    store.commit('login', { token, user })
    emit('handleUserlogin', { token, user }); 
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
</script>

<style scoped>
.loginForm {
height: 400px;
}
</style>