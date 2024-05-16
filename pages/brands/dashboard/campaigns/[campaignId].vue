<script setup lang="ts">
import type { ICampaign, ICampaignRequest } from "types";
import {
  getCampaign,
  getSingleCampaignRequest,
} from "../../../../api/brand/campaign/campaign.brand";

definePageMeta({
  layout: "brands",
  colorMode: "dark",
});

    const route = useRoute();
    const router = useRouter();
    const campaign = ref<ICampaign>()
    const requests = ref<ICampaignRequest[]>([])
    const createBrandCampaignStore = useCreateBrandCampaignStore();
    const toast = useToast()
    const userStore = useUserStore()
    const API_URL = useRuntimeConfig().public.API_URL
    const loading = ref(true)
    const brief = ref<string>("https://google.com")

    const SingleCampaign = async()=> {

        const { campaignId } = route.params;
        const accessToken = userStore.accessToken || "";

        try {
            const platform = await getSingleCampaignRequest({
                apiUrl: API_URL,
                campaignId,
                accessToken,
            });
            requests.value = platform;
            console.log(requests.value)
            loading.value = false;

        } catch(error: any){
            loading.value = true
            console.log(error)
            toast.add( {title: error.data?.message || "Something went wrong"} )
        }
    }

    const loadCampaign = async() => {
        const { campaignId } = route.params;
        const accessToken = userStore.accessToken || ""
        try {
            const camp= await getCampaign({
                apiUrl: API_URL,
                campaignId,
                accessToken,
            })
            
            campaign.value = camp

            
            SingleCampaign()
        } catch (error: any) {
            router.back()
            toast.add({ title: "error getting campaign"})
            console.log(error)
        }
    }

    const openBrief = (link:string) =>{
        navigateTo( link, {
            open: {
                target: '_blank',
                windowFeatures: {
                width: 500,
                height: 500
                }
            },
            external: true
            })

    }
    onMounted(async() => await loadCampaign())
</script>

<template>
    <div class="overflow-hidden max-w-[100%] p-0">
        <nuxt-link class="pl-10" to='/brands/dashboard/campaigns'>
            Back
        </nuxt-link>

        <div class="flex flex-col md:flex-row gap-2 max-w-full">

            <div class="flex max-w-[100%] p-auto flex-col basis-3/4 gap-5">
                <div class="flex px-12 bg-vDarkBlue mb-10 py-12  rounded-lg flex-col md:flex-row gap-5">
                    <div class="flex flex-col gap-5  text-white w-full">

                        <div class="flex justify-between border-b-2 py-3 border-darkBlue">
                            <div>
                                <p class="text-purplelabel text-xs">BUDGET</p>
                                <span class="text-2xl font-bold">NGN {{ campaign?.budget.toLocaleString() }}</span>
                                
                            </div>
                            <div>
                                <p class="text-purplelabel text-xs">Cost</p>
                                <span class="text-2xl font-bold">NGN {{ campaign?.cost.toLocaleString() }}</span>
                            </div>
                        </div>

                        <h4 class="text-3xl text-purplelabel break-words">{{ campaign?.headline }}</h4>
                        

                        <button v-if="campaign?.brief" @click="openBrief(campaign?.brief)">
                            Open Brief
                        </button>
                       

                        

                        <div class="flex relative justify-center  bg-purplelabel rounded-lg">
                            
                                <img src="/assets/images/created.svg" alt="">
                            </div>

                        <p class="text-wrap">
                            {{ campaign?.description }}
                        </p>



                        <div class="flex gap-1 items-center">
                        <!-- icon type thing -->
                        <div class="flex flex-col items-center max-w-min">
                            <div class="h-2 w-2 rounded-full bg-grey1"></div>
                            <div class="h-4 w-[0.05rem] rounded-full bg-grey1"></div>
                            <div class="h-2 w-2 rounded-full bg-grey1"></div>
                        </div>
                        <!-- end icon thing-->
                        <div class="text-sm text-[#CDC2FF] text-nowrap">
                            <p> Start Date: <span class="font-light text-xs">{{ campaign?.start_date?.toString().split("T")[0] }}</span></p>
                            <p> End Date: <span class="font-light text-xs">{{ campaign?.end_date?.toString().split("T")[0] }}</span></p>
                        </div>
                        </div>



                        <div class="flex gap-5">
                            <div class="flex flex-col gap-1">
                                <p class="text-purplelabel ">Content Type</p>
                                <div >

                                </div>
                                Photos,Videos
                            </div>

                            <div class="flex flex-col gap-1">
                                <p class="text-purplelabel ">Platform Type</p>
                                <div class="flex gap-1 overflow-hidden">

                                    <img v-if="campaign?.deliverables?.platform.includes('instagram')" class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('linkedin')" class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('facebook')" class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('tiktok')" class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('twitter')"  class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('whatsapp')"  class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('snapchat')"  class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('youtube')" class="object-contain" src="/assets/icons/collab/youtube.svg" alt=""> 
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4>Requirements</h4>
                            <li>{{ campaign?.deliverables?.requirements }}</li>
                        </div>

                        <div class="flex flex-col gap-3">
                            <h1 class="uppercase font-bold">Metrics</h1>
                            <div class="flex justify-between">
                                <div class="flex flex-col gap-2">
                                    <h4 class="text-xs text-gray-500">VIEWS</h4>
                                    <p>---</p>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="text-xs text-gray-500">IMPRESSIONS</h4>
                                    <p>---</p>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="text-xs text-gray-500">ENGAGEMENT RATE</h4>
                                    <p>---</p>
                                </div>
                            </div>

                            <div class="flex justify-between">
                                <div class="flex flex-col gap-2">
                                    <h4 class="text-xs text-wrap text-gray-500">TOP AGE DEMOGRAPHIC</h4>
                                    <p>---</p>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="text-xs text-gray-500">TOP LOCATION</h4>
                                    <p>---</p>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="text-xs text-gray-500">TOTAL AUDIENCE</h4>
                                    <p>---</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                
            </div>
            <div class="basis-1/4 md:px-4 flex flex-col gap-5 ">
                <div class="flex flex-row md:flex-col gap-4" v-if="loading">
                    <CreatorLoadingCard/>
                    <CreatorLoadingCard/>
                    <CreatorLoadingCard/>
                </div>

                <div v-else  v-for="request in requests" :key="request.id">
                    <BrandsCampaignRequestCard
                    :request=request
                    />
                </div>


            </div>
        </div>

        <div>
            <div class="mx-4 mt-10">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    <thead
                    class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg"
                    >
                    <tr>
                        <th scope="col" class="px-6 py-3">Campagin Headline</th>

                        <th scope="col" class="px-6 py-3">Cost</th>
                        <th scope="col" class="px-6 py-3">Budget</th>
                        <th scope="col" class="px-6 py-3">Status</th>
                        <th scope="col" class="px-6 py-3">Pay</th>
                        <th scope="col" class="px-6 py-3">Publish</th>

                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td class="px-6 py-4">
                                    <USkeleton class="h-4 w-[250px]" />
                                </td>
                                <td class="px-6 py-4">
                                    <USkeleton class="h-4 w-[250px]" />
                                </td>
                                <td class="px-6 py-4">
                                    <USkeleton class="h-4 w-[250px]" />
                                </td>
                                <td class="px-6 py-4">
                                    <USkeleton class="h-4 w-[250px]" />
                                </td>
                                <td class="px-6 py-4">
                                    <USkeleton class="h-4 w-[250px]" />
                                </td>
                                <td class="px-6 py-4">
                                    <USkeleton class="h-4 w-[250px]" />
                                </td>
                                <td class="px-6 py-4">
                                    <USkeleton class="h-4 w-[250px]" />
                                </td>
                            </tr>
                            <tr v-else v-for="campaign in campaigns" :key="campaign.id" class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue">
                                <th scope="row" class="pl-6 py-4 font-medium text-gray-900 text-wrap  dark:text-white">
                                    <p class="max-w-[100px] break-words">
                                        {{campaign.headline}}
                                    </p>
                                </th>
                                
                                <td class="pl-6 py-4">
                                    {{campaign.cost.toLocaleString()}}
                                </td>
                                <td class="pl-6 py-4">
                                    {{campaign.budget.toLocaleString()}}
                                </td>
                                <td class="pl-6 py-4">
                                    <UBadge size="xs" :label="campaign.is_paid ? 'Paid' : 'Not Paid'" :color="campaign.is_paid ? 'emerald' : 'orange'" variant="subtle" />
                                </td>
                                <td class="pl-6 py-4">
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
                        <td class="pl-6 py-4">
                        <UButton
                            v-if="campaign.is_published"
                            icon="i-heroicons-check"
                            size="2xs"
                            color="emerald"
                            variant="outline"
                            :ui="{ rounded: 'rounded-full' }"
                            square
                            :disabled="true"
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
        </div>
    </div>
</template>
