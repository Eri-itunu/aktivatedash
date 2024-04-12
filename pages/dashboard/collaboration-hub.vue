
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

  <div class="flex flex-wrap gap-2 items-center justify-center">
    <CollabCard v-for="collab in collabs" :key="collab.id" :collab="collab" />
    <CollabCard v-for="collab in collabs" :key="collab.id" :collab="collab" />
  </div>
</template>

