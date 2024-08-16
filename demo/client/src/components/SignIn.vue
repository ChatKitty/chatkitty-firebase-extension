<script setup lang="ts">
import {
  getRedirectResult,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {useFirebaseAuth } from 'vuefire'
import {onMounted, ref} from "vue";

const auth = useFirebaseAuth()

const error = ref(null)

const signinRedirect = () => {
  if (!auth) {
    throw new Error('Auth is not available')
  }

  signInWithEmailAndPassword(auth, "jane@chatkitty.com", "123456")
    .then(() => {
      console.log('Signed in')
    })
    .catch((reason) => {
      console.error('Failed to sign in', reason)
      error.value = reason
    })
};

// only on client side
onMounted(() => {
  if (!auth) {
    throw new Error('Auth is not available')
  }

  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})
</script>

<template>
  <main>
    <div v-if="error" >{{error}}</div>
    <button @click="signinRedirect()">Sign In</button>
  </main>
</template>
