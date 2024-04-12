<template>
  <div>
    <div v-for="message in allMessages" :key="message.id">
        <ul>
            <li>
                <p>{{message.senderId}}</p>
                <h1>{{message.text}}</h1>
                <p>{{message.reciverId}}</p>
            </li>
        </ul>
    </div>
    <Button @handleClick="handleShowSendForm" title="send a message"/>
    <div v-show="showSendForm">
        <Seachbar />
        <from>
            <label>text</label>
            <input 
            type="text"
            v-model="text"
            placeholder="write your message"/>
        </from>
    </div>
  </div>
</template>

<script setup>
import { SEND_MESSAGES } from "../utils/mutations";
import { QUERY_MESSAGES } from "../utils/queries";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import Button from './Button.vue'
import Searchbar from './Searchbar.vue'
import { ref, defineEmits, onMounted, watchEffect, computed } from "vue";
const store = useStore();
const selfUserId = computed(() => store.getters.selfUserId);
const { mutate } = useMutation(SEND_MESSAGES);
const { result: queryResult } = useQuery(QUERY_MESSAGES);
const allMessages = ref([]);
watchEffect(async () => {
  try {
    if (queryResult.value) {
      console.log(queryResult.value);
      allMessages.value = await queryResult.value.messages;
    }
  } catch (error) {
    console.log(error);
  }
});
const showSendForm= ref(false)
const handleShowSendForm = ()=>{
    showSendFrom.value = !showSendFrom.value
}
</script>
