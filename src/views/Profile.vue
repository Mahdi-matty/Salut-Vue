<template>
  <div></div>
</template>


<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const isLoggedIn = computed(() => store.state.isLoggedIn);
const user = computed(() => store.state.user);

if (!isLoggedIn){
    return (
        <div>Please log in to continue
        <RouterLink to="/">Log In</RouterLink>
        </div>
    )
}
</script>
