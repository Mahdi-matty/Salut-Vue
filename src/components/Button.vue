<template>
    <button @click="$emit('handleClick')">{{buttonText}}</button>
</template>


<script setup>
import {computed} from 'vue'
const props =defineProps({
    showForm: Boolean
})
// it is not optimal since components should be reusable
const buttonText = computed(()=>{
    return props.showForm ? "close form " : "show form"
})
   
</script>
