<template>
    <form @submit.prevent="handleLogin">
        <label>userName</label>
        <input
        v-model="userName"
        placeholder="enter userName" />
        <label>password</label>
        <input 
        v-model="password"
        placeholder="enter password"/>
        <input 
            type="submit"
            value="save "/>
    </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useMutation } from '@vue/apollo-composable';
import { LOGIN } from '../utils/mutations.js';
const username = ref('')
const password = ref('')

const { mutate } = useMutation(LOGIN);
const emit = defineEmits(['handleUserlogin'])

const handleLogin = async () => {
  try {
    const { data } = await mutate({ username: username.value, password: password.value });
    const { token, user } = data.login;
    localStorage.setItem('id_token', token)

    console.log('Login successful. Token:', token, 'User:', user);

    emit('handleUserlogin', { token, user }); 
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
</script>
