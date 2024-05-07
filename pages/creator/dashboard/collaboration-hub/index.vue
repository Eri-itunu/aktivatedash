
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
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


const loadCollaborationHub = async(page: number) => {
  const filter = {
    limit: "5",
    page: page.toString(),
    platformType: "",
    contentType: "",
    currency: "NGN",
    price: "",
  }
  const qs = new URLSearchParams(filter)
  try {
    const { data, meta: { last_page } } = await getCollaborationHub({
      apiUrl: API_URL,
      accessToken: userStore.accessToken as string,
      qs: qs.toString()
    })
    collabCampaigns.value.push(...data)
    lastPage.value = last_page
  } catch(err) {
    console.error(err)
  }
}
watchEffect(async() => loadCollaborationHub(page.value))



</script>


<template>
  <div class="flex flex-wrap items-center lg:justify-around justify-center">
    <div class="w-[49%] md:min-w-min min-w-full pb-2" v-for="collab in collabCampaigns" :key="collab.id">
        <CreatorCollabCard  :collab="collab" />
    </div>
    <div class="my-auto">
      <button v-if="page<lastPage" class="p-3 border border-purple1 text-purple1 h-min" @click="page++">
        Load more
      </button>
    </div>
  </div>
</template>

