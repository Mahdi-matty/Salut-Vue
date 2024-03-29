<template>
  <form>
    <input 
    v-model="userName"
    placeholder="choose a userName"/>
    <input 
    v-model="password"
    placeholder="enter a password"/>
    <input 
    v-model="email"
    placeholder="enter your email address"/>
    <Button :buttonText = "'singup'" :handleClick = "signUpFunction"/>
  </form>
</template>


<script setup>
import { ref } from 'vue'
import Button from './Button.vue'

const userName = ref('')
const password = ref('')
const email = ref('')

const signUpFunction = ()=>{
    const userObj = {
        username: userName.value,
        password: password.value,
        email:email.value
    }
}

</script>