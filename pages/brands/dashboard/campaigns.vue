<script setup lang="ts">
    definePageMeta({
    layout: 'brands',
    colorMode: 'light',
    })
</script>

<template>
    <div class="flex gap-5 items-center justify-between text-grey1 px-2 mb-2">
      <div>
        <p> Campaigns</p>
        <div>
            <button class="px-2 py-1 text-xs bg-[#3A3846] rounded-full">Active</button>
            <button class="px-2 py-1 text-xs rounded-full">Requests</button>
        </div>
      </div>

      <nuxt-link :to="{path: 'create-campaign', append: true }">
        <button class="rounded-[100px] bg">
          Create New Campaign
        </button>
      </nuxt-link>
    </div>
    <div class="flex flex-wrap justify-center items-center gap-4">
          <BrandsCampaignCard />
          <BrandsCampaignCard />
          <BrandsCampaignCard />
          <BrandsCampaignCard />
        </div>
</template>