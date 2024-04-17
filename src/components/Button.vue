<template>
    <button  @click="$emit('handleClick')">{{title}}</button>
</template>


<script setup>
import {computed} from 'vue'
const props =defineProps({
    title: String
})
// it is not optimal since components should be reusable


   
</script>
