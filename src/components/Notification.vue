<template>
    <div>
        <div v-for="notes in allNotifications" :key="notes.id">
            <p>{{notes.message}}</p>
        </div>
    </div>
</template>

<script setup>
import { QUERY_NOTIFICATION} from '../utils/queries'
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
const store = useStore();
const allNotifications = ref([])
const selfUserId = computed(() => store.getters.selfUserId);
import { ref, defineEmits, defineProps, watchEffect, computed } from "vue";
const {result: queryResult } =   useQuery(QUERY_NOTIFICATION, ()=>({userId: selfUserId}))

watchEffect(async()=>{
try{
     if (queryResult.value) {
      console.log(queryResult.value);
      allNotifications.value = await queryResult.value.Notifications;
     }
}catch(error){
    console.log(error)
}
})
</script>
