<template>
    <div class="bodyWhole">
      <NavBar />
  <header>
    <div class="wrapper">
      <Header title='Task tracker'/>
    </div>
  </header>
  </div>
</template>

<script setup >
import {ref} from 'vue'

import NavBar from './components/NavBar.vue'


const showAddForm = ref(false)
const showDiv = ()=>{
  showAddForm.value = !showAddForm.value
}
 
const tasks = ref([
  {
    id: 1,
    text: 'goldon',
    reminder: true,
    day: "March 28th"
  },
  {
    id: 2,
    text: 'baghche',
    reminder: true,
    day: "March 29th"
  },
  {
    id: 3,
    text: 'iron',
    reminder: false,
    day: "March 28th"
  },
]);

const toggleReminder = (id)=>{
 tasks.value= tasks.value.map((task)=> task.id == id ? {...task, reminder: !task.reminder}: task)
}

const addNewTask = (userObj)=>{
  tasks.value = [...tasks.value, userObj]
}

</script>



<style scoped>
.bodyWhole{
  height: 100vh;
  width: 100vw;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
