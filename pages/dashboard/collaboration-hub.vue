
<script setup lang="ts">
import collabs from '../../mock/collabs'

definePageMeta({
  layout: 'dashboard'
})


</script>


<template>

  

  <div class="flex flex-wrap gap-2 items-center justify-center">
    <CollabCard v-for="collab in collabs" :key="collab.id" :collab="collab" />
    <CollabCard v-for="collab in collabs" :key="collab.id" :collab="collab" />
  </div>
</template>

