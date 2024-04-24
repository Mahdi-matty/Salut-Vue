<template>
  <div class="inline-flex flex-col">
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
import { UPLOAD_IMAGE} from '../utils/mutations'
import { useQuery, useMutation } from "@vue/apollo-composable"
const { mutate: imageUpload } = useMutation(UPLOAD_IMAGE);
const title = ref( "");
const content = ref("");
const selectedFile = ref(null);
const imageSource = ref("");
const handleChange = (event) => {
  selectedFile = event.target.files[0];
};
const handleUpload = async (selectedFile) => {
  try{
    const {data} = await imageUpload({
      image: selectedFile
    })
    console.log(data)
    imageSource.value = data.Image
  }catch(error){
    console.log(error)
  }
};
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
