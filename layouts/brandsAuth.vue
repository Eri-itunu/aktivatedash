<template>
   <div class="h-full w-screen md:w-screen">
        <slot/>
   </div>
</template>

<script setup lang="ts">
import { definePageMeta } from 'nuxt/dist/pages/runtime';

  definePageMeta({
    colorMode: 'light'
  })
</script>