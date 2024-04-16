<template>
    <button class="bg-yellow-300 w-40 h-10 rounded-3xl m-4" @click="$emit('handleClick')">{{title}}</button>
</template>


<script setup>
import {computed} from 'vue'
const props =defineProps({
    title: String
})
// it is not optimal since components should be reusable


   
</script>
