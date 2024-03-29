<template>
    <form>
        <input
        v-model="userName"
        placeholder="enter userName" />
        <input 
        v-model="password"
        placeholder="enter password"/>
        <Button :buttonText="'login'" :handleClick = 'loginFunction' />
    </form>
</template>

<script setup>
import { ref } from 'vue'
import Button from './Button.vue'

const userName = ref('')
const password = ref('')

const loginFunction = ()=>{
const userObj = {
    username : userName.value,
    password: password.value
}
}
</script>
