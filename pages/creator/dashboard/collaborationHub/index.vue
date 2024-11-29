
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})


import type { ICampaign, CollabHubDetails } from 'types';
import { getCollaborationHub, } from "../../../../api/creator/campaign/campaign.creator";

const config = useRuntimeConfig()
const API_URL = config.public.API_URL;

const userStore = useUserStore()

const collabCampaigns = ref<ICampaign[]>([]);
const pending = ref(false);
const page = ref(1)
const lastPage = ref(1)

const volume = ref([0,1,2,3,4])
const details = ref<CollabHubDetails[]>([
        {id:1, headline: "Mum Influencer to visit Parent & Baby Support Clinic located in Brookvale NSW",
            name: "Kohls", gift:true , paid:true,
        },
        {id:2, headline: "Mum Influencer to visit Parent & Baby Support Clinic located in Brookvale NSW",
            name: "Kohls", gift:true , paid:true,
        },
        {id:3, headline: "Mum Influencer to visit Parent & Baby Support Clinic located in Brookvale NSW",
            name: "Kohls", gift:true , paid:true,
        },
        {id:4, headline: "Mum Influencer to visit Parent & Baby Support Clinic located in Brookvale NSW",
            name: "Kohls", gift:true , paid:true,
        }
    ])





</script>


<template>
  <div class="">
    <div class="flex flex-col bg-vDarkBlue  gap-2 p-8 " >
      <h1>Collaboration Hub</h1>
      <p>Discover small business partnerships that fit your style! Collaboration Hub connects you with unique, budget-friendly campaigns, where you get to choose the campaigns you want to join. Opt in and grow with brands that value your creativity!</p>
    </div>


    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4" >
            <div v-for="detail in details" :key=detail.id >
                <CreatorCollabHubCard :details=detail  />
            </div>
        </div>
  </div>
</template>

