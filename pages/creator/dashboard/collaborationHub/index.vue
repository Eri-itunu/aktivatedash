
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth', 
})


import type { ICampaign } from 'types';
import { getCollaborationHub } from "../../../../api/creator/campaign/campaign.creator";

const config = useRuntimeConfig()
const API_URL = config.public.API_URL;

const userStore = useUserStore()

const collabCampaigns = ref<ICampaign[]>([]);
const pending = ref(false);
const page = ref(1)
const lastPage = ref(1)

const volume = ref([0,1,2,3,4])





</script>


<template>
  <div class="">
    <div class="flex flex-col bg-dashbg  gap-2 px-8 " >
      <h1>Collaboration Hub</h1>
      <p>Discover small business partnerships that fit your style! Collaboration Hub connects you with unique, budget-friendly campaigns, where you get to choose the campaigns you want to join. Opt in and grow with brands that value your creativity!</p>
    </div>


    <div v-for="(index, item) in volume" :key="index" >
       <div class="rounded-lg" >

       </div> 
    </div>
  </div>
</template>

