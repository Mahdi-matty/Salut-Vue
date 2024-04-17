<template>
 <div>
  <!-- <Button class="bg-yellow-300 w-15 h-10 rounded-3xl m-4" @handleClick="handleComDiv" title="add Comment"/> -->
  <div>
    <form @submit.prevent="handleSubmit">
      <input 
      class="border-blue-50 border-4 p-2 my-4 w-40"
      type="text"
      v-model="text"
      placeholder="enter your comment"
      name="text"/>
      <input         class="border-blue-50 border-4 p-2 my-4 w-20"
       type="submit"
      value="save"/>
    </form>
  </div>
  <div v-if="comments !== null && comments.length !== 0">
    <div v-for="comment in comments" :key="comment.id">
      <ul>
        <li class="text-white">{{ comment.text }}</li>
        <Button @handleClick="handleRemoveComment(comment)" title="removeComment"/>
      </ul>
    </div>
  </div>
 </div>
  
</template>


<script setup>
import Button  from './Button.vue'
import { ref, defineEmits, computed } from "vue";
import { useStore } from "vuex";
import {REMOVE_COMMENT, ADD_COMMENT} from '../utils/mutations'
import { useMutation } from "@vue/apollo-composable";
const text = ref('')
const {mutate: RemoveCoomment} = useMutation(REMOVE_COMMENT)
const {mutate: AddComment} = useMutation(ADD_COMMENT)
const store = useStore();
const selfUserId = computed(() => store.getters.selfUserId);
const props =defineProps({
    comments: Array,
    postId: Number
})


const handleRemoveComment = async (comment)=>{
    if(comment.userId === selfUserId){
      try {
        const {data} = await RemoveCoomment({
          userId: selfUserId,
          id: comment.id
        })
        console.log(data)
      }catch(error){
        console.error(error)
      }
    }

}
const handleSubmit = async()=>{
  const userId= selfUserId.value
  try{
    const {data} = await AddComment({
      userId,
      text: text.value,
      postId: props.postId
    })
    console.log(data)
  }catch(error){
    console.error(error)
  }
}
</script>
