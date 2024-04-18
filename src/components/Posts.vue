<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      <ul>
        <li class="border-b border-white min-h-40">
          <h3 class="text-white">{{ post.title }}</h3>
          <p class="text-white">{{ post.content }}</p>
          <img :src="post.imageSource" />
          <div class="inline-flex flex-row">
             <TrashIcon
            v-if="post.userId === selfUserId"
            class="h-6 w-6"
            @click="handleDeletePost(post)"
          />
          <HeartIcon
          class="w-6 h-6"
            :class="{ liked: post.likes.some(like=> like.userId == selfUserId) }"
            @click="toggleLike(post)"
          />
          <ChatIcon class="2-6 h-6" @click="handleCommentShow"/>
          </div>
         
            <Comments v-show="showComment" :comments="post.comments" :postId="parseInt(post.id)" />
          <Button
          class="bg-blue-300 w-20 h-10 rounded-3xl m-4"
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
              <Button class="bg-yellow-300 w-20 h-10 rounded-3xl m-4"  title="upload" />
              <input type="submit" value="save " />
            </form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon, HeartIcon,ChatIcon} from '@heroicons/vue/outline'
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
const showComment = ref(false)
const selfUserId = computed(() => store.getters.selfUserId);
const handleCommentShow = ()=>{
   showComment.value = !showComment.value
}
const handleDeletePost = async (post) => {
  try {
    const { data } = await Deletepost({
      userId: selfUserId.value,
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
  showEditDev.value = !showEditDev.value;
};
const handleSaveEdit = async () => {
  try {
    const { data } = await EditPost({
      userId: selfUserId.value,
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
const likedPost = ref(false)
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
    console.log(post.likes)
    const alreadyLiked = post.likes.some(like => like.userId === selfUserId);
    if (!alreadyLiked && post.likes.length == 0) {
      await LikePosts({
        status: "liked",
        userId: selfUserId.value,
        postId: post.id,
      });
    }else{
      const userLike = postLikes.find(like => like.userId === selfUserId);
      if(userLike){
         await DisLikePosts({
        userId: selfUserId.value,
        id:userLike.id
      })
      }     
    }
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};
</script>

<style scoped>
.liked {
color: red;
}
</style>
