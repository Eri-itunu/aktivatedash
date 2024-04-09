
<script  >
import CampaignCard from '~/components/CampaignCard.vue';
import  Collabs from "~/mock/collabs";
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
  
  
  <div class="">
    <HeadlessTabGroup>
    <HeadlessTabList>
      <HeadlessTab>Tab 1</HeadlessTab>
      <HeadlessTab>Tab 2</HeadlessTab>
      <HeadlessTab>Tab 3</HeadlessTab>
    </HeadlessTabList>
    <HeadlessTabPanels>
      <HeadlessTabPanel>
        <div class="flex flex-wrap justify-center align-center gap-4">
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
        </div>
      </HeadlessTabPanel>
      <HeadlessTabPanel>Content 2</HeadlessTabPanel>
      <HeadlessTabPanel>Content 3</HeadlessTabPanel>
    </HeadlessTabPanels>
  </HeadlessTabGroup>
  </div>

  <!-- <div class="flex flex-wrap justify-center align-center gap-4">
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
  </div> -->

  <div class="flex items-center justify-center py-6">
    <UButton color="purple" variant="outline">Load More</UButton>
  </div>
</template>

