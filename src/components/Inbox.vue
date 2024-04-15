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
        <Seachbar :FollowMode="false" @userInfo="handleUserInfo"/>
        <from @submit.prevent="handleSendMess">
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
import { SEND_MESSAGES, ADD_Notif } from "../utils/mutations";
import { QUERY_MESSAGES } from "../utils/queries";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import Button from './Button.vue'
import Searchbar from './Searchbar.vue'
import Notification from './Notification.vue'
import { ref, defineEmits, onMounted, watchEffect, computed } from "vue";
const store = useStore();
const reciverId = ref('')
const text = ref('')
const handleUserInfo = (userInfo)=>{
reciverId.value= userInfo.UserId
}
const selfUserId = computed(() => store.getters.selfUserId);
const { mutate: sendMess } = useMutation(SEND_MESSAGES);
const { mutate: sendNot } = useMutation(ADD_Notif);
const { result: queryResult } = useQuery(QUERY_MESSAGES, ()=>({senderId: selfUserId}));
const allMessages = ref([]);
const handleSendMess = async()=>{
  try{
    const newMsg = await sendMess({
      text :text.value,
      senderId: selfUserId,
      reciverId: reciverId.value 
    })
    console.log(newMsg)
    if(newMsg){
      const newNote = await sendNot({
        UserId: reciverId.value,
        message: "new Message",
        status: "unread"
      })
      console.log(newNote)
    }
  }catch(error){
    console.log(error)
  }
}
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
    showSendForm.value = !showSendForm.value
}
</script>
