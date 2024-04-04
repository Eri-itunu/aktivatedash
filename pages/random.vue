<script setup lang="ts">
  definePageMeta({
    layout: "dashboard"
  })
  const store = useCounterStore()
  console.log(store)
</script>

<template>
  <p class="text-white"> This is a testing page</p>
  <p class="text-white"> Count is </p>
</template>>