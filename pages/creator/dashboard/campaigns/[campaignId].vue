<script setup lang="ts" >
    definePageMeta({
    layout: 'brands',
    colorMode: 'dark'
    })

    const route = useRoute();

    const createBrandCampaignStore = useCreateBrandCampaignStore();
    const { headline, startDate, endDate, description, requirements, budget, contentType, platformType, loading_CreateCampaign } = storeToRefs(createBrandCampaignStore);
    const toast = useToast()
</script>


<template>
    <div class="flex px-8 flex-col gap-5">
        <div class="flex px-24 bg-vDarkBlue mb-10 py-12 rounded-lg flex-col md:flex-row gap-5">
            <div class="flex flex-col gap-5  text-white w-full">

                <div class="flex justify-between border-b-2 py-3 border-darkBlue">
                    <div class=" ">
                        Draft
                    </div>
                    <div>
                        <p class="text-purplelabel text-xs">BUDGET</p>
                        <span class="text-2xl font-bold">N {{ budget.toLocaleString() }}</span>
                    </div>
                </div>

                <h4 class="text-3xl text-purplelabel">{{ headline }}</h4>


                <div class="h-[200px]">
                    <img src="/assets/images/pexels-ethan-sees-2741674 2.svg" class="w-full h-full object-cover rounded-lg" alt="">
                </div>

                <p class="text-wrap">
                    {{ description }}
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
                    <p> Start Date: <span class="font-light text-xs">{{ startDate }}</span></p>
                    <p> End Date: <span class="font-light text-xs">{{endDate }}</span></p>
                </div>
                </div>



                <div class="flex gap-5">
                    <div class="flex flex-col gap-1">
                        <p class="text-purplelabel ">Content Type</p>
                        {{contentType.join(", ")  }}
                    </div>

                    <div class="flex flex-col gap-1">
                        <p class="text-purplelabel ">Platform Type</p>
                        <div class="flex gap-1 overflow-hidden">
                            <img v-if="platformType.includes('instagram')" class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
                            <img v-if="platformType.includes('linkedin')" class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
                            <img v-if="platformType.includes('facebook')" class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
                            <img v-if="platformType.includes('tiktok')" class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
                            <img v-if="platformType.includes('twitter')"  class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
                            <img v-if="platformType.includes('whatsapp')"  class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
                            <img v-if="platformType.includes('snapchat')"  class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
                            <img v-if="platformType.includes('youtube')" class="object-contain" src="/assets/icons/collab/youtube.svg" alt="">
                        </div>
                    </div>
                </div>

                <div>
                    <h4>Requirements</h4>
                    <li>{{requirements}}</li>
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
</template>