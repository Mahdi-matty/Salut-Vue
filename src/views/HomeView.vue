<template>
  <div>
    <div v-show="!showSignUp" class="ml-16">
      <Login @handleUserlogin ="userLogFunc" />
    </div>
    <Button class="bg-yellow-300 w-40 h-10 rounded-3xl m-4" @handleClick = "handleSignDiv" :title = "buttontitle"/>
    <div v-show="showSignUp">
      <SignUp @handleUserSignup ="userSignUp" />
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import Button from "../components/Button.vue";
import router  from '../router'
const showSignUp = ref(false)
const handleSignDiv = ()=>{
    showSignUp.value = !showSignUp.value
}
const buttontitle = computed(()=>{
    return showSignUp.value ? "Hide Signup" : "Show Signup";
})

const userLogFunc = ({token, user})=>{
 if (token && user){
    router.push({name: 'profile'})
 }
}
const userSignUp = ({token, user})=>{
if (token && user){
    router.push({name: 'profile'})
}
}


</script>
