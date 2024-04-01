<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <label>Tasks</label>
            <input
            v-model="newTask"
            type="text"
            name="Task"
            placeholder="enter a task" />
            <label>Date</label>
            <input
            v-model="dateTime"
            type="text"
            name="Date"
            placeholder="enter your date" />
            <label>set reminder</label>
            <input
            type="checkbox"
            v-model="reminder"
            name="set a reminder" />
            <input 
            type="submit"
            value="save Task"/>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const newTask = ref('')
const dateTime = ref('')
const reminder = ref(false)

const emit = defineEmits(['handleObject'])
    const handleSubmit = ()=>{
         const userObj = {
    id: Math.floor(Math.random() * 1000),
    text: newTask.value,
    day: dateTime.value,
    reminder: reminder.value
}
emit('handleObject', userObj)
    }
   




</script>
