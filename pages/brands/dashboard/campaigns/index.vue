<script setup lang="ts">
    definePageMeta({
    layout: 'brands',
    colorMode: 'dark',
    })

    import type {ICampaign, ResponseMessage} from "types"
    const config = useRuntimeConfig()
    const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"
    const toast = useToast();
    const getBrandCampaignStore = useGetBrandCampaignStore()
    const campaigns = ref<ICampaign[]>([])
    const isPublished = ref(false)


    const getCampaigns = async() => {
      try {
          const data = await getBrandCampaignStore.getBrandCampaigns()
          campaigns.value = [] 
          campaigns.value.push(...data)
      } catch (error: any) {
          toast.add({ title: error.message})
      }
    }


    watchEffect(async() => { await getCampaigns() })


    async function handlePayment(id:string){

      try{
        const res = await getBrandCampaignStore.payForCampaign(id)
        navigateTo(res.url, {
          open: {
            target: '_blank',
            windowFeatures: {
              width: 500,
              height: 500
            }
          }
        })
        await getCampaigns()
      }
      catch(error:any){
        toast.add({ title: error.message})
      }
      
    }

    const userStore = useUserStore()
    async function  publishCampaign(campaignId:string):Promise<void>{

      try{
          const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/publish-campaign/${campaignId}`, {
              headers: { Authorization: `Bearer ${userStore.accessToken}`}
          });
          toast.add({title: "Published successfuly"})
          await getCampaigns()
          
      }   
      catch(error:any){
         toast.add({title:error.data?.message || "Something went wrong"})
      }

      }

</script>

<template>
    <div class="flex gap-5 items-center justify-end mt-5 text-grey1 px-2 mb-2">
      

      <nuxt-link to="/brands/dashboard/campaigns/create-campaign">
        <button class="rounded-[100px] bg">
          Create New Campaign
        </button>
      </nuxt-link>
    </div>
    <!-- <div class="flex flex-wrap justify-center items-center gap-4">
      <BrandsCampaignCard />
      <BrandsCampaignCard />
      <BrandsCampaignCard />
      <BrandsCampaignCard />
    </div> --> 

      <div class="mx-4 mt-10">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Campagin Headline
                      </th>
                      
                      <th scope="col" class="px-6 py-3">
                          Cost
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Budget
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Pay
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Publish
                      </th>

                      <th scope="col" class="px-6 py-3">
                          Action
                      </th>

                  </tr>
              </thead>
              <tbody>

                  <tr v-for="campaign in campaigns" :key="campaign.id" class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {{campaign.headline}}
                      </th>
                      
                      <td class="px-6 py-4">
                         {{campaign.cost.toLocaleString()}}
                      </td>
                      <td class="px-6 py-4">
                         {{campaign.budget.toLocaleString()}}
                      </td>
                      <td class="px-6 py-4">
                          <UBadge size="xs" :label="campaign.is_paid ? 'Paid' : 'Not Paid'" :color="campaign.is_paid ? 'emerald' : 'orange'" variant="subtle" />
                      </td>
                      <td class="px-6 py-4">
                        <UButton
                          v-if="campaign.is_paid"
                          icon="i-heroicons-check"
                          size="2xs"
                          color="emerald"
                          variant="outline"
                          :ui="{ rounded: 'rounded-full' }"
                          square
                          disabled="true"
                        />

                        <UButton
                          v-else
                          icon="i-heroicons-arrow-path"
                          size="2xs"
                          color="orange"
                          variant="outline"
                          :ui="{ rounded: 'rounded-full' }"
                          square
                          @click="handlePayment(campaign.id)"
                        >
                          Pay Now
                        </UButton>

                        


                      </td>
                      <td class="px-6 py-4">

                        <UButton
                          v-if="campaign.is_published"
                          icon="i-heroicons-check"
                          size="2xs"
                          color="emerald"
                          variant="outline"
                          :ui="{ rounded: 'rounded-full' }"
                          square
                          disabled="true"
                        />
                        

                        <UButton
                          v-else
                          icon="i-heroicons-arrow-path"
                          size="2xs"
                          color="orange"
                          variant="outline"
                          :ui="{ rounded: 'rounded-full' }"
                          square
                          @click="publishCampaign(campaign.id)"
                          
                        >
                          Publish Campaign
                        </UButton>

                        


                      </td>

                      <td>
                        <button @click="$router.push(`/brands/dashboard/campaigns/${campaign.id}`)">
                          View Details
                        </button>
                      </td>
                  </tr>
                  
              </tbody>
          </table>
        </div>
      </div>

    
</template> 


