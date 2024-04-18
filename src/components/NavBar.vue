<script setup>
import { RouterLink } from 'vue-router'

</script>


<template>
    <div >
        <RouterLink  to="/">Home</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink  to="/detail/inbox">inbox</RouterLink>
        <RouterLink  to="/detail/notification">notification</RouterLink>

    </div>
  
</template>

<style scoped>
 div{
    top: 0px;
    widows: 100%;
 }

 a.router-link{
    color: black;
 }
 a.router-link:hover{
    color: blue
 }
</style>