import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    login(state, { token, user }) {
      state.isAuthenticated = true;
      state.user = user;
      // Optionally, store the token in local storage or cookies
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      // Optionally, clear the token from local storage or cookies
    },
  },
  actions: {
    // Define actions for login and logout if needed
  },
});


// also i have to write  app.use(store);   in main  file

{/* <template>
  <div>
    <div v-if="isAuthenticated">Logged in as: {{ user.name }}</div>
    <div v-else>Not logged in</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Use computed property to get authentication state from the Vuex store
const isAuthenticated = computed(() => store.state.isAuthenticated);
const user = computed(() => store.state.user);
</script> */}