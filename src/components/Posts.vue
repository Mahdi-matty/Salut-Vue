<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      <ul>
        <li>
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <img :src="post.imageSource" />
          <Comments :comments="post.comments" :postId="post.id"/>
          <i
            v-if="post.userId === tUserId"
            :handleClick="handleDeletePost(post)"
            class="fa-solid fa-xmark"
          ></i>
          <i
            class="fa-solid fa-heart"
            :class="{ liked: post.liked }"
            @click="toggleLike(post)"
          ></i>
          <Button
            v-if="post.userId === tUserId"
            @handleClick="handleEditPost(post)"
            title="edit post"
          />
          <div v-show="showEditDev">
            <form @submit.prevent="handleSaveEdit">
              <label>Title</label>
              <input
                v-model="editedPost.title"
                type="text"
                name="title"
                placeholder="edit  title"
              />
              <label>content</label>
              <input
                v-model="editedPost.content"
                type="text"
                name="content"
                placeholder="edit content "
              />
              <label>image</label>
              <input type="file" @change="handleChange" name="imageSource" />
              <Button @handleClick="handleUpload" title="upload" />
              <input type="submit" value="save " />
            </form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import "@fortawesome/fontawesome-free/css/all.css";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ref, defineEmits, onMounted, computed, reactive } from "vue";
import { QUERY_POSTS } from "../utils/queries";
import Comments from './Comments.vue'
import {
  EDIT_POST,
  DELETE_POST,
  ADD_LIKE,
  REMOVE_LIKE,
} from "../utils/mutations";
import Button from "./Button.vue";
const editedPost = reactive({ title: "", content: "", imageSource: "" });
const { mutate: EditPost } = useMutation(EDIT_POST);
const { mutate: Deletepost } = useMutation(DELETE_POST);
const { mutate: LikePosts } = useMutation(ADD_LIKE);
const { mutate: DisLikePosts } = useMutation(REMOVE_LIKE);
import { useStore } from "vuex";
const store = useStore();
const posts = ref([]);
const showEditDev = ref(false);
const selfUserId = computed(() => store.getters.selfUserId);
const handleDeletePost = async (post) => {
  try {
    const { data } = await Deletepost({
      userId: selfUserId,
      id: post.id,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const handleEditPost = (post) => {
  editedPost.title = post.title;
  editedPost.content = post.content;
  editedPost.imageSource = post.imageSource;
  showEditDev.value = true;
};
const handleSaveEdit = async () => {
  try {
    const { data } = await EditPost({
      userId: selfUserId,
      id: editedPost.id,
      title: editedPost.title,
      content: editedPost.content,
      imageSource: editedPost.imageSource,
    });
    console.log("Post edited:", data);
    editedPost.title = "";
    editedPost.content = "";
    editedPost.imageSource = "";
    showEditDev.value = false;
  } catch (error) {
    console.error("Error editing post:", error);
  }
};
onMounted(async () => {
  try {
    const { data } = await useQuery(QUERY_POSTS);
    posts.value = data.posts;
  } catch (error) {
    console.log(error);
  }
});

const toggleLike = async (post) => {
  try {
    await LikePosts({
      status: liked,
      userId: selfUserId,
      postId: post.id,
    });
    post.liked = !post.liked; // Toggle liked state
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};
</script>
