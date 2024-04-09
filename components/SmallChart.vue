<script setup lang="ts" >
  const bars = [
    { height: 20, color: 'green'},
    { height: 30, color: 'green'},
    { height: 50, color: 'red'},
    { height: 80, color: 'green'},
    { height: 70, color: 'grey'},
  ]
</script>

<template>
  <div class="flex items-end justify-end gap-1 pr-2 w-full h-full ">
    <SmallBar v-for="bar, i in bars" :key="i" :height="bar.height" :color="bar.color" />
  </div>
</template>