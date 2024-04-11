<template>
  <div v-if="isLoggedIn">
    <div>
      <Searchbar  />
    </div>
    <div>
      <Button @handleClick="showFormDev" title="Add new post" />
      <div v-show="showAddForm">
        <PostForm  />
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
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import Searchbar from "../components/Searchbar.vue";
import PostForm from "../components/PostForm.vue";
import Posts from "../components/Posts.vue";
import Button from "../components/Button.vue";
const store = useStore();
const showAddForm = ref(false);
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
</script>
