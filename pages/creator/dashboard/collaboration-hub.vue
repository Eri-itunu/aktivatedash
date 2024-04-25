
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const collabStore = useCollabStore();
const { pending, collabCampaigns } = storeToRefs(collabStore)


watchEffect(async() => await collabStore.getCollabHub())



</script>


<template>
  <div class="flex flex-wrap items-center lg:justify-between justify-center">
    <div class="w-[49%] md:min-w-min min-w-full pb-2" v-for="collab in collabStore.collabCampaigns" :key="collab.id">
        <CollabCard  :collab="collab" />
    </div>
  </div>
</template>

