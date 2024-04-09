import './assets/main.css'

import { createApp,  provide, h  } from 'vue'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'
import store from './store'


const apolloClient = new ApolloClient({
    uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server URL
    cache: new InMemoryCache()
  });


const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})
app.use(store);
app.use(router)
app.mount('#app')
