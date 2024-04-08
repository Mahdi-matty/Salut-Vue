<script>
import { RouterLink } from 'vue-router'

</script>


<template>
    <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>

    </div>
  
</template>

<style scoped>
 div{
    top: 0px;
    widows: 100%;
    background-color: aqua;
 }

 a.router-link{
    color: black;
 }
 a.router-link:hover{
    color: blue
 }
</style>