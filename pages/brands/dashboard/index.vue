<script setup lang="ts">
    definePageMeta({
    layout: "brands"
    })

    const userStore = useUserStore()
</script>

<template>
    <div class="text-white  flex items-center gap-1 pl-1 py-4">
      <p class="text-lg text-nowrap"> Hello {{ userStore.userProfile?.first_name }}</p>
      <img class="object-contain h-6" src="/assets/icons/wink-emoji.svg" alt="">
    </div>
     <BrandsMetricSection />
     <br />
     <BrandsCampaignSection />
</template> 