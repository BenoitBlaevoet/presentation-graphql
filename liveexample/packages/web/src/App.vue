<script setup>
import HelloWorld from './views/HelloWorld.vue'

import { createClient, provideClient } from '@urql/vue'
const client = createClient({
  url: 'http://localhost:3000/graphql'
  // fetchOptions: () => {
  //   const token = getToken()
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}`: '' }
  //   }
  // }
})

provideClient(client)

</script>

<template>
  <HelloWorld />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
