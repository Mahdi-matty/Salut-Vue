<template>
  <div class="ml-6" v-if="isLoggedIn">
    <div>
      <Searchbar  :FollowMode="true"/>
    </div>
    <div class="relative">
      <div class="fixed bottom-6 right-6">
      <PlusSmIcon class="w-8 h-8 cursor-pointer" @Click="showFormDev" title="Add new post" />
      </div>
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50" v-show="showAddForm">
        <div class="bg-white p-6 rounded-md">
        <PostForm :isEditMode="false"  @handleFormRegister = "handleAddPost" />
        </div>
      </div>
      <div>
        <Posts />
      </div>
    </div>
  </div>
  <div v-else>
    <h1>please login to continue</h1>
    <RouterLink to="/">Log In</RouterLink>
  </div>
</template>


<script setup>
import { PlusSmIcon } from '@heroicons/vue/outline'
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import Searchbar from "../components/Searchbar.vue";
import PostForm from "../components/PostForm.vue";
import Posts from "../components/Posts.vue";
import Button from "../components/Button.vue";
const store = useStore();
const showAddForm = ref(false);
import { ADD_POST } from "../utils/mutations";
import { useMutation } from "@vue/apollo-composable";
const { mutate } = useMutation(ADD_POST);
const showFormDev = () => {
  showAddForm.value = !showAddForm.value;
};
onMounted(() => {
  const tokenFromStorage = localStorage.getItem("idToken");
  if (tokenFromStorage) {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    store.commit("login", { token: tokenFromStorage, user: userFromStorage });
  }
});
const isLoggedIn = computed(() => store.state.isLoggedIn);
const user = computed(() => store.state.user);
const selfUserId = computed(() => store.getters.userId);

const handleAddPost = (fomrObject, selectedFile)=>{
    try {
      const { title, content, imageSource } = fomrObject
    if (selectedFile != null) {
      const { data } = mutate({
        title,
        content,
        imageSource,
        userId: selfUserId,
      });
      const result = data.ADD_POST;
      console.log(result);
      title.value = "";
    content.value = "";
    selectedFile.value = null;
    imageSource.value="";
    }
    const { data } = mutate({
      title: title.value,
      content: content.value,
      userId: selfUserId,
    });
    const result = data.ADD_POST;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
</script>
