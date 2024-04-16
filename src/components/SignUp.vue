<template>
  <div class="inline-flex flex-col text-white">
    <form class="inline-flex flex-col focus-within:text-green-600 mt-10 ml-28" @submit.prevent="handleSubmit">
      <label>userName</label>
      <input
      class="border-blue-50 border-4 p-2 my-4 w-60"
        v-model="username"
        type="text"
        name="username"
        placeholder="enter a username"
      />
      <label>email</label>
      <input
      class="border-blue-50 border-4 p-2 my-4 w-60"
        v-model="email"
        type="text"
        name="email"
        placeholder="enter your email address"
      />
      <label>password</label>
      <input class="border-blue-50 border-4 p-2 my-4 w-60" type="password" v-model="password" placeholder="set a password" />
      <input class="border-blue-50 border-4 p-2 my-4 w-60" type="submit" value="save " />
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { NEW_USER } from "../utils/mutations";
const { mutate } = useMutation(NEW_USER);
const username = ref("");
const email = ref("");
const password = ref("");

const emit = defineEmits(['handleUserSignup'])
const handleSubmit = async () => {
  try {
    const { data } = await mutate({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const {token, user} = data.addUser
    localStorage.setItem('idToken', token)
     store.commit('login', { token, user });
    console.log("singup successful. Token:", token, "User:", user);
    emit("handleUserSignup", { token, user });
  } catch (error) {
    console.error("signup failed:", error.message);
  }
};
</script>
