
<script>
import CampaignCard from '~/components/CampaignCard.vue';
import Collabs from "~/mock/collabs";
// import CollabCard from "~/components/CollabCard.vue";


export default {
  components: { CampaignCard },
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

  <Filter/>

  <div class="container mx-auto grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-10">
    <CollabCard v-for="collab in collabs" :key="collab.id" :collab="collab" />
    <CollabCard v-for="collab in collabs" :key="collab.id" :collab="collab" />
  </div>
</template>

