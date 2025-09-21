<script setup lang="ts">
useSeoMeta({
  title: 'NuxtHub Starter',
  description: 'A Nuxt template to build your full-stack application on the edge.'
})
const { locales, setLocale, localeProperties } = useI18n()

const toggle = 0

import { useAuthentication } from '#imports'

const { user, initializeUser } = useAuthentication()

// Initialize user from stored session on app start
onMounted(() => {
  initializeUser()
})

</script>

<template>
  <v-app>
    <v-app-bar color="primary" class="px-4">
      <div>Prenzlbogen Parcel Exchange</div>
      <v-spacer />
      <v-btn v-for="locale in locales" class="mx-2" @click="setLocale(locale.code)"
        :variant="locale.code === localeProperties.code ? 'outlined' : 'plain'">
        {{ locale.code.toUpperCase() }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<style>
.v-main {
  background-color: #F9FFF9;
}
</style>