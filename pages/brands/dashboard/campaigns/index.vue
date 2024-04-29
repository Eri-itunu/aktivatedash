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
    

    const getCampaigns = async() => {
      try {
          
          const data = await getBrandCampaignStore.getBrandCampaigns()
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
      }   
      catch(error:any){
         toast.add({title:error.data?.message || "Something went wrong"})
      }

      }

</script>

<template>
    <div class="flex gap-5 items-center justify-between mt-5 text-grey1 px-2 mb-2">
      <div>

        <div>
            <button class="px-2 py-1 text-xs bg-[#3A3846] rounded-full">Active</button>
            <button class="px-2 py-1 text-xs rounded-full">Requests</button>
        </div>
      </div>

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
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Campagin Headline
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Platforms
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
                  </tr>
              </thead>
              <tbody>

                  <tr v-for="campaign in campaigns" :key="campaign.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {{campaign.headline}}
                      </th>
                      <td class="px-6 py-4">
                          {{campaign.start_date.toString().split('T')[0]}}
                      </td>
                      <td class="px-6 py-4">
                         {{campaign.cost}}
                      </td>
                      <td class="px-6 py-4">
                         {{campaign.budget}}
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
                  </tr>
                  
              </tbody>
          </table>
        </div>
      </div>

    
</template> 


