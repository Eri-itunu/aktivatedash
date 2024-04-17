<script lang="ts" setup>
  import collabs from '../../mock/collabs';
</script>


<template>
  <!-- Collaboration Hub -->
  <div>
    <div class="flex justify-between text-sm py-4 pr-3 text-grey1">
      <p> Collaboration Hub</p>
      <div class="flex gap-3">
        <nuxt-link to="/dashboard/collaboration-hub">
          <p class="underline">See all</p>
        </nuxt-link>
        <div class="flex gap-2">
          <img class="object-contain" src="/assets/icons/arrow-circle-left.svg" alt="">
          <img class="object-contain" src="/assets/icons/arrow-circle-right.svg" alt="">
        </div>
      </div>
    </div>
    <div class="flex gap-3 overflow-x-scroll">
      <CollabCard
        v-for="collab in collabs"
        :key="collab.id" :collab="collab"
      />
      <CollabCard
        v-for="collab in collabs"
        :key="collab.id" :collab="collab"
      />
    </div>
  </div>
  <!-- end Collaboration Hub -->
</template>