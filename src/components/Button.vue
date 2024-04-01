<template>
    <button @click="$emit('handleClick')">{{title}}</button>
</template>


<script setup>
const props =defineProps({
    title: String
})
   
</script>
