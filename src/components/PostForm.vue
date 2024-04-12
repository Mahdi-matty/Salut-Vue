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
const title = ref( "");
const content = ref("");
const selectedFile = ref(null);
const imageSource = ref("");
const handleChange = (event) => {
  selectedFile = event.target.files[0];
};
const handleUpload = () => {};
const emit = defineEmits(['handleFormRegister'])

const handleSubmit = ()=>{
  const fromObject = {
    title: title.value,
    content: content.value,
    imageSource: imageSource.value
  }
  emit("handleFormRegister", fromObject, selectedFile.value)
}
</script>
