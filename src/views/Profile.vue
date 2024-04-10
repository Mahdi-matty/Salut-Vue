<template>
  <div v-if="isLoggedIn"> 
    <Searchbar :titl="userId"/>
  </div>
   <div v-else> 
    <h1>please login to continue</h1>
    <RouterLink to="/">Log In</RouterLink>
  </div>
  
</template>


<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import Searchbar from '../components/Searchbar.vue'
const store = useStore();

const isLoggedIn = computed(() => store.state.isLoggedIn);
const user = computed(() => store.state.user);
console.log(user)
const userId = user.value ? user.value.id : null;

</script>
