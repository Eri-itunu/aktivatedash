
<script  >
  import  Collabs from "~/mock/collabs";
  import CollabCard from "~/components/CollabCard.vue";


  export default {
    data() {
      return {
        collabs: Collabs
      }
    }
  }

  definePageMeta({
  layout: 'dashboard'
})


</script>
 


<template>
  

  <div class="container mx-auto grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-2">
    <CollabCard
        v-for="collab in collabs"
        :key="collab.id" :collab="collab"
      />
  </div>

  <div class="flex items-center justify-center py-6">
    <UButton color="purple" variant="outline">Load More</UButton>
  </div>
</template>

