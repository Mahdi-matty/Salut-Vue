<template>
 <div>
  <Button @handleClick="handleComDiv" title="add Comment"/>
  <div v-show="showAddcomment">
    <form @submit.prevent="handleSubmit">
      <label>text</label>
      <input 
      type="text"
      v-model="text"
      placeholder="enter your comment"
      name="text"/>
      <input type="submit"
      value="save"/>
    </form>
  </div>
  <div v-if="comments !== null && comments.length !== 0">
    <div v-for="comment in comments" :key="comment.id">
      <ul>
        <li>{{ comment.text }}</li>
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
const showAddcomment = ref(false)
const handleComDiv = ()=>{
  showAddcomment.value = !showAddcomment.value
}
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
