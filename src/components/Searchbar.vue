<template>
  <div>
    <div>
      <input type="text" v-model="username" placeholder="Search" />
      <Button @handleClick="searchUsernames" title="Search" />
    </div>
    <div v-show="showResDev">
        {{ userName }}{{userId}}
        <Button @handleClick ="followUser" title="search"/>
    </div>
  </div>
</template>


<script setup>
import { useQuery, useMutation  } from "@vue/apollo-composable";
import { ADD_FOLLOW } from "../utils/mutations.js";
import { QUERY_USER_SEARCH } from "../utils/queries";
import Button from "./Button.vue";
import { ref, defineEmits, watchEffect, computed  } from 'vue'
const showResDev = ref(false)
const props =defineProps({
    titl: String
})
const username = ref('')
const userName = ref('');
const followedUserId = ref('')
const {mutate } = useMutation(ADD_FOLLOW)
const { result, loading, error } = useQuery(QUERY_USER_SEARCH, () => ({ query: username.value }));
const searchUsernames = async ()=>{
    showResDev.value = !showResDev.value 
    try {
      
      watchEffect(() => {
           if (username.value) {
        result.value?.refetch();  
            userName.value = computed(() => result.value?.data.searchUser.username);
        followedUserId.value = result.value?.data.searchUser.id;
           }})
    }catch(error ){
      console.error(error);
    }
}

const followUser = async ()=>{
  const { data } = await mutate({
    followingUserId: parseInt(props.titl),
    followedUserId: followedUserId.value
  })
  const result = data.addFollow
  console.log(result)

}
</script>
