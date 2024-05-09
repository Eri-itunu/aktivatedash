<script setup lang="ts" >
import type { ICampaign, ICampaignRequest } from "types";
import { getCampaign, getSingleCampaignRequest } from "../../../../api/brand/campaign/campaign.brand"

    definePageMeta({
    layout: 'brands',
    colorMode: 'dark'
    })

    const route = useRoute();
    const router = useRouter();
    const campaign = ref<ICampaign>()
    const requests = ref<ICampaignRequest[]>([])
    const createBrandCampaignStore = useCreateBrandCampaignStore();
    const toast = useToast()
    const userStore = useUserStore()
    const API_URL = useRuntimeConfig().public.API_URL
    const loading = ref(true)

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
    onMounted(async() => await loadCampaign())
</script>


<template>
    <div class="pl-10" > Back</div>
    <div class="flex gap-2">

        <div class="flex px-8 flex-col basis-3/4 gap-5">
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

                    <h4 class="text-3xl text-purplelabel">{{ campaign?.headline }}</h4>


                    <div class="h-[200px]">
                        <img src="/assets/images/pexels-ethan-sees-2741674 2.svg" class="w-full h-full object-cover rounded-lg" alt="">
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
                                <h4>VIEWS</h4>
                                <p>---</p>
                            </div>
                            <div class="flex flex-col gap-2">
                                <h4>VIEWS</h4>
                                <p>---</p>
                            </div>
                            <div class="flex flex-col gap-2">
                                <h4>VIEWS</h4>
                                <p>---</p>
                            </div>
                        </div>

                        <div class="flex justify-between">
                            <div class="flex flex-col gap-2">
                                <h4>VIEWS</h4>
                                <p>---</p>
                            </div>
                            <div class="flex flex-col gap-2">
                                <h4>VIEWS</h4>
                                <p>---</p>
                            </div>
                            <div class="flex flex-col gap-2">
                                <h4>VIEWS</h4>
                                <p>---</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="flex gap-2 pt-4">
                <button class="basis-1/3  text-white border-purplebg border-[0.5px] rounded">
                    <nuxt-link to="/brands/dashboard/campaigns/">
                        Back
                    </nuxt-link>
                </button>

            </div>
        </div>
        <div class="basis-1/4 flex flex-col gap-5">
            <div class="flex flex-col gap-4" v-if="loading">
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
</template>