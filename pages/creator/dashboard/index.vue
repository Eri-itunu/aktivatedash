<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
    colorMode: "dark"
});
const userStore = useUserStore();
</script>

<template>
  <div class="text-white ">

    <div class="flex items-center gap-1 pl-1">
      <p class="text-2xl text-nowrap">Welcome, {{ userStore.userProfile?.firstName }}</p>
     
    </div>
    <br />

    <CreatorMetricsSection />

    <!-- <CreatorCollabSection /> -->

    <CreatorCampaignSection />
  </div>

</template>
