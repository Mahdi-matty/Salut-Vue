<template>
  <div>
    <div>
      <input type="text" v-model="username" placeholder="Search" />
      <Button @handleClick="searchUsernames" title="Search" />
    </div>
    <div>
        {{ userName }}
    </div>
  </div>
</template>


<script setup>
import { useMutation } from "@vue/apollo-composable";
import { ADD_FOLLOW } from "../utils/mutations.js";
import { USER_SEARCH } from "../utils/queries";
import Button from "./Button.vue";
import { ref, defineEmits } from 'vue'
const username = ref('')
const userName = ref('');
const searchUsernames = async ()=>{
    try {
        const { data } = await mutate({ query: username.value });
         userName.value = data.USER_SEARCH.username

    }catch(error ){

    }
}
</script>
