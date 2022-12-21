<script setup>
import HelloWorld from './views/HelloWorld.vue'

import { createClient, provideClient } from '@urql/vue'
const client = createClient({
  url: 'http://localhost:8000/graphql'
  // fetchOptions: () => {
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' }
  //   }
  // }
})

provideClient(client)

</script>

<template>
  <HelloWorld />
</template>

<style scoped>

</style>
