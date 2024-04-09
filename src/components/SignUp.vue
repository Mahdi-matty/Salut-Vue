<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label>userName</label>
      <input
        v-model="username"
        type="text"
        name="username"
        placeholder="enter a username"
      />
      <label>email</label>
      <input
        v-model="email"
        type="text"
        name="email"
        placeholder="enter your email address"
      />
      <label>password</label>
      <input type="password" v-model="password" name="set a password" />
      <input type="submit" value="save " />
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
    
    console.log("singup successful. Token:", token, "User:", user);
    emit("handleUserSignup", { token, user });
  } catch (error) {
    console.error("signup failed:", error.message);
  }
};
</script>
