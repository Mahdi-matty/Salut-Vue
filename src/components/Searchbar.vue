<template>
  <div>
    <div>
      <input class="border-blue-50 border-4 p-2 my-4 w-60 rounded-1xl" type="text" v-model="username" placeholder="Search users" />
      <Button class="bg-yellow-300 w-40 h-10 rounded-3xl m-4" @handleClick="searchUsernames" title="Search" />
    </div>
    <div v-if="FollowMode" v-show="showResDev">
      {{ userName }}{{ followedUserId }}
      <Button class="bg-yellow-300 w-40 h-10 rounded-3xl m-4" @handleClick="followUser" title="follow" />
      <Button class="bg-yellow-300 w-40 h-10 rounded-3xl m-4" @handleClick="unFollowUser" title="unfollow" />
    </div>
    <div v-else>
      {{ userName }}{{ followedUserId }}
    </div>
  </div>
</template>


<script setup>
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ADD_FOLLOW , REMOVE_FOLLOW} from "../utils/mutations.js";
import { QUERY_USER_SEARCH } from "../utils/queries";
import Button from "./Button.vue";
import { useStore } from "vuex";
const store = useStore();
const selfUserId = computed(() => store.getters.selfUserId);
import { ref, defineEmits, defineProps, watchEffect, computed } from "vue";
const showResDev = ref(false);
const props =defineProps({
    FollowMode: Boolean
})
const username = ref("");
const userName = ref("");
const followedUserId = ref("");
const {result, refetch } =   useQuery(QUERY_USER_SEARCH, ()=>({username: username.value,}))
const { mutate: addFollow } = useMutation(ADD_FOLLOW);
const { mutate: removeFollows } = useMutation(REMOVE_FOLLOW);
const emit = defineEmits(['userInfo'])
const searchUsernames = async () => {
  showResDev.value = !showResDev.value;
  try {
      await refetch();
      const user = result.value.searchUsers
      userName.value = user.username
      followedUserId.value = user.id;
      emit('userInfo', {userName: user.username, UserId: user.id})
    } catch (error) {
    console.error(error);
  }
};

const followUser = async () => {
  const { data } = await addFollow({
    followingUserId: selfUserId,
    followedUserId: followedUserId.value,
  });
  const result = data.addFollow;
  console.log(result);
};
const unFollowUser = async () => {
  const { data } = await removeFollows({
    followingUserId: selfUserId,
    followedUserId: followedUserId.value,
  });
  const result = data.removeFollow;
  console.log(result);
};
</script>
