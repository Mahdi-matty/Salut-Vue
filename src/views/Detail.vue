<template>
<Inbox />
    
</template>


<script setup>
import Inbox from '../components/Inbox.vue'
import { useStore } from "vuex";
const store = useStore();
const selfUserId = computed(() => store.getters.selfUserId);

</script>
