<template>
  <div>
    <div v-if="type == 'inbox'">
      <Inbox />
    </div>
    <div v-else-if="type === 'notification'">
      <Notification />
    </div>
  </div>
</template>


<script setup>
import Inbox from "../components/Inbox.vue";
import {
  ref,
  computed,
} from "vue";
import Notification from "../components/Notification.vue";
const props =defineProps({
    type: String
})
import { useStore } from "vuex";
const store = useStore();
const selfUserId = computed(() => store.getters.selfUserId);
</script>
