<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label>Title</label>
      <input
        v-model="title"
        type="text"
        name="title"
        placeholder="enter a title"
      />
      <label>content</label>
      <input
        v-model="content"
        type="text"
        name="content"
        placeholder=" content "
      />
      <label>image</label>
      <input type="file" @change="handleChange" name="imageSource" />
      <Button @handleClick="handleUpload" title="upload" />
      <input type="submit" value="save " />
    </form>
  </div>
</template>



<script setup>
import Button from "./Button.vue";
import { ref, defineEmits } from "vue";
import { ADD_POST } from "../utils/mutations";
import { useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
const store = useStore();
const selfUserId = computed(() => store.getters.selfUserId);
const { mutate } = useMutation(ADD_POST);
const title = ref("");
const content = ref("");
const selectedFile = ref(null);
const imageSource = ref("");
const handleChange = (event) => {
  selectedFile = event.target.files[0];
};
const handleUpload = () => {};
const handleSubmit = async () => {
  try {
    if (selectedFile != null) {
      const { data } = mutate({
        title: title.value,
        content: content.value,
        imageSource: imageSource.value,
        userId: parseInt(props.titl),
      });
      const result = data.ADD_POST;
      console.log(result);
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
};
</script>
