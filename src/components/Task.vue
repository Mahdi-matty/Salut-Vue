<template>
<div :class="[task.reminder? 'reminder': '']"  @dblclick="$emit('toggle-reminder', task.id)">
    <h3>{{task.text}}</h3>
    <p>{{task.day}}</p>
</div>
    
</template>


<script setup>
 const props = defineProps({
    task: Object
 })
</script>

<style scoped>
    .reminder{
        border-left: 5px solid green;
    }
</style>