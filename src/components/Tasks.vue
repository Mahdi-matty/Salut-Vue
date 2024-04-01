<template>
<div>
    <div  :key="task.id" v-for="task in tasks">
       <Task @toggle-reminder="$emit('toggle-reminder', task.id)" :task = 'task' />
    </div>
</div>
    
</template>


<script setup>
import Task from './Task.vue'
 const props = defineProps({
    tasks: Array
 })
</script>


