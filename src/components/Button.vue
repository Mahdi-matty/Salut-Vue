<template>
    <button @click="handleClick()">{{buttonText}}</button>
</template>


<script setup>
const props =defineProps({
    title: String
})
   
</script>
