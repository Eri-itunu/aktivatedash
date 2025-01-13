<script setup lang="ts" >
    import type { ICampaign, ICampaignRequest } from '@/types';
    const props = defineProps<{
        campaign:ICampaign
        requests:ICampaignRequest[]
        loading:Boolean
    }>()


    // functions
    const openBrief = (link: string) => {
        navigateTo(link, {
            open: {
            target: "_blank",
            windowFeatures: {
                width: 500,
                height: 500,
            },
            },
            external: true,
        });
    };
</script>

<template>
    <div v-if="loading" >
        <CreatorCollabHubDetailsLoading />
    </div>
    <div v-else>
        <div class="flex max-w-[100%] p-auto flex-col basis-3/4 gap-5">
            <div
            class="flex px-12  mb-10 py-12 rounded-lg flex-col md:flex-row gap-5"
            >
            <div class="flex flex-col gap-5 text-black dark:text-white w-full">
                <div class="flex justify-between border-b-2 py-3 border-darkBlue">
                <div>
                    <p class="text-black dark:text-purplelabel text-xs">BUDGET</p>
                    <span class="text-2xl text-black dark:text-white font-bold"
                    >NGN {{ campaign?.budget?.toLocaleString() }}</span
                    >
                </div>
                <div>
                    <p class="text-black dark:text-purplelabel text-xs">Cost</p>
                    <span class="text-2xl font-bold"
                    >NGN {{ campaign?.cost?.toLocaleString() }}</span
                    >
                </div>
                </div>

                <h4 class="text-3xl text-black dark:text-purplelabel break-words">
                {{ campaign?.headline }}
                </h4>

                <button v-if="campaign?.brief" @click="openBrief(campaign?.brief)">
                Open Brief
                </button>

                <div class="flex relative justify-center bg-purplelabel rounded-lg h-44">
                <img
                    v-if="campaign?.images && campaign.images[0] != null"
                    :src="campaign?.images[0]  "
                    class="object-fill w-full h-full rounded-lg"
                    alt=""
                />
                <img v-else src="/assets/images/created.svg" class="object-fit" alt="" />
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
                <div class="text-sm text-[#CDC2FF] border-y-2 py-6 w-full border-dotted text-nowrap">
                    <p>
                    Start Date:
                    <span class="font-light text-xs">{{
                        campaign?.startDate?.toString().split("T")[0]
                    }}</span>
                    </p>
                    <p>
                    End Date:
                    <span class="font-light text-xs">{{
                        campaign?.endDate?.toString().split("T")[0]
                    }}</span>
                    </p>
                </div>
                </div>

                <div class="flex gap-5">
                <div class="flex flex-col gap-1">
                    <p class="text-purplelabel">Content Type</p>
                    <div></div>
                    Photos,Videos
                </div>

                <div class="flex flex-col gap-1">
                    <p class="text-purplelabel">Platform Type</p>
                    <div class="flex gap-1 overflow-hidden">
                    <img
                        v-if="campaign?.deliverables?.platform.includes('instagram')"
                        class="object-contain"
                        src="/assets/icons/collab/instagram.svg"
                        alt=""
                    />
                    <img
                        v-if="campaign?.deliverables?.platform.includes('linkedin')"
                        class="object-contain"
                        src="/assets/icons/collab/linkedin.svg"
                        alt=""
                    />
                    <img
                        v-if="campaign?.deliverables?.platform.includes('facebook')"
                        class="object-contain"
                        src="/assets/icons/collab/facebook.svg"
                        alt=""
                    />
                    <img
                        v-if="campaign?.deliverables?.platform.includes('tiktok')"
                        class="object-contain"
                        src="/assets/icons/collab/tiktok.svg"
                        alt=""
                    />
                    <img
                        v-if="campaign?.deliverables?.platform.includes('twitter')"
                        class="object-contain"
                        src="/assets/icons/collab/twitter.svg"
                        alt=""
                    />
                    <img
                        v-if="campaign?.deliverables?.platform.includes('whatsapp')"
                        class="object-contain"
                        src="/assets/icons/collab/whatsapp.svg"
                        alt=""
                    />
                    <img
                        v-if="campaign?.deliverables?.platform.includes('snapchat')"
                        class="object-contain"
                        src="/assets/icons/collab/snapchat.svg"
                        alt=""
                    />
                    <img
                        v-if="campaign?.deliverables?.platform.includes('youtube')"
                        class="object-contain"
                        src="/assets/icons/collab/youtube.svg"
                        alt=""
                    />
                    </div>
                </div>
                </div>

                <div class="border-b-2 border-dotted py-4">
                <h4>Requirements</h4>
                <li>{{ campaign?.deliverables?.requirements }}</li>
                </div>
               

            </div>
            </div>
        </div>

        <div class="px-8  flex flex-col gap-4">
            <p class="text-[#E1DCF7] font-semibold tracking-tighter">Requested Influencers <span> </span></p>
            <div class="grid grid-cols-2 gap-4" v-if="loading">
            <CreatorLoadingCard />
            <CreatorLoadingCard />
            <CreatorLoadingCard />
            </div>

            <div class="grid grid-cols-2 gap-12" v-else >
        
            <div v-for="request in requests" :key="request.id" ><BrandsCampaignRequestCard :request="request" /></div>
            </div>
        </div>
    </div>
</template>