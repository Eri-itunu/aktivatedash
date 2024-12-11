<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
    colorMode: "dark"
});
const userStore = useUserStore();
</script>

<template>
  <div class="text-white ">
    <!-- Hello Akin -->
    <div class="flex items-center gap-1 pl-1">
      <p class="text-lg text-nowrap">Hi, {{ userStore.userProfile?.firstName }}</p>
      <img class="object-contain h-6" src="/assets/icons/wink-emoji.svg" alt="" />
    </div>
    <br />

    <CreatorMetricsSection />
    <!-- END Hello Akin -->

    <!-- <CreatorCollabSection /> -->

    <CreatorCampaignSection />
  </div>

</template>
