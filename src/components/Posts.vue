<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      <ul>
        <li>
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <img :src="post.imageSource" />
          <Comments :comments="post.comments" :postId="parseInt(post.id)" />
          <i
            v-if="post.userId === selfUserId"
            :handleClick="handleDeletePost(post)"
            class="fa-solid fa-xmark"
          ></i>
          <i
            class="fa-solid fa-heart"
            :class="{ liked: post.liked }"
            @click="toggleLike(post)"
          ></i>
          <Button
            v-if="post.userId === selfUserId"
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
import {
  ref,
  defineEmits,
  onMounted,
  watchEffect,
  computed,
  reactive,
} from "vue";
import { QUERY_POSTS, QUERY_LIKES } from "../utils/queries";
import Comments from "./Comments.vue";
import PostForm from "./PostForm.vue";
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
  editedPost.id = post.id;
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
const { result: queryResult } = useQuery(QUERY_POSTS);
watchEffect(async () => {
  try {
    if (queryResult.value) {
      console.log(queryResult.value);
      posts.value = await queryResult.value.posts;
    }
  } catch (error) {
    console.log(error);
  }
});

const toggleLike = async (post) => {
  try {
    const { result } = useQuery(QUERY_LIKES, () => ({ postId: post.id }));
    const postLikes = await result.likes;
    const alreadyLiked = postLikes.some(like => like.userId === selfUserId);
    if (!alreadyLiked) {
      await LikePosts({
        status: "liked",
        userId: selfUserId,
        postId: post.id,
      });
    }else{
      const userLike = postLikes.find(like => like.userId === selfUserId);
      if(userLike){
         await DisLikePosts({
        userId: selfUserId,
        id:userLike.id
      })
      }
     
    }

  } catch (error) {
    console.error("Error toggling like:", error);
  }
};
</script>
