<script setup lang="ts" >
    definePageMeta({
    layout: 'brands',
    })
    const isOpen = ref(false)

    const campaignFormStore = useCampaignFormStore();
    const form = campaignFormStore.$state;
</script>


<template>
    <div class="flex px-8 flex-col gap-5">
        <brandsCampaignStage/>

        <div class="flex px-24 bg-vDarkBlue mb-10 py-12 rounded-lg flex-col md:flex-row gap-5">
            <div class="flex flex-col gap-5  text-white w-full">
                

                <div class="flex justify-between border-b-2 py-3 border-darkBlue">
                    <p>Draft</p>

                    <div>
                        <p>BUDGET PER POST</p>
                        <span class="text-2xl">N {{ form.amount_posts }}</span>
                    </div>
                </div>

                <h4>{{ form.headline }}</h4>


                <div class="h-[200px]">
                    <img src="../../../assets/images/pexels-ethan-sees-2741674 2.svg" class="w-full h-full object-cover rounded-lg" alt="">
                </div>

                <p class="text-wrap">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia deleniti rem, architecto, voluptas ipsum, culpa neque alias optio sunt rerum tenetur laboriosam nisi? Enim error dignissimos beatae quidem dolorem.
                </p>

                <p class="text-wrap">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia deleniti rem, architecto, voluptas ipsum, culpa neque alias optio sunt rerum tenetur laboriosam nisi? Enim error dignissimos beatae quidem dolorem.
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
                    <p> Start Date: <span class="font-light text-xs">{{ form.start_date }}</span></p>
                    <p> End Date: <span class="font-light text-xs">{{ form.end_date }}</span></p>
                </div>
                </div>

               

                <div class="flex gap-5">
                    <div class="flex flex-col gap-1">
                        <p>Content Type</p>
                        Photos, Videos
                    </div>

                    <div class="flex flex-col gap-1">
                        <p>Platform Type</p>
                        <div class="flex gap-1 overflow-hidden">
                            <img class="object-contain" src="../../../assets/icons/collab/facebook.svg" alt="">
                            <img class="object-contain" src="../../../assets/icons/collab/instagram.svg" alt="">
                            <img class="object-contain" src="../../../assets/icons/collab/tiktok.svg" alt="">
                            <img class="object-contain" src="../../../assets/icons/collab/twitter.svg" alt="">
                            <img class="object-contain" src="../../../assets/icons/collab/whatsapp.svg" alt="">
                            <img class="object-contain" src="../../../assets/icons/collab/snapchat.svg" alt="">
                            <img class="object-contain" src="../../../assets/icons/collab/linkedin.svg" alt="">
                            <img class="object-contain" src="../../../assets/icons/collab/youtube.svg" alt="">
                        </div>
                    </div>
                </div>

                <div>
                    <h4>Requirements</h4>
                    <li>{{form.requirements}}</li>
                    <li>Lorem ipsum dolorus nisi asperiores! Ipsam debitis placeat aliquam n</li>
                    <li>Lorem ipsum dolorus nisi asperiores! Ipsam debitis placeat aliquam n</li>
                    <li>Lorem ipsum dolorus nisi asperiores! Ipsam debitis placeat aliquam n</li>
                    <li>Lorem ipsum dolorus nisi asperiores! Ipsam debitis placeat aliquam n</li>
                </div>

                <UModal v-model="isOpen" prevent-close>
                    <div class="p-16 ">
                        <div class="flex justify-end">
                            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click=" navigateTo('/brands/dashboard')" />
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <div>
                                <p class="text-center">Campaign Created</p>
                                <p class="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit.  </p>
                            </div>

                            <nuxt-link class="w-full p-3 rounded flex justify-center text-center items-center bg-[#5331E8]" to="/brands/dashboard/campaigns">
                                <p class="text-center">View Campaigns</p>
                            </nuxt-link>
                        </div>
                    </div>
                </UModal>


            </div> 
        </div>    

        <div class="flex gap-2 pt-4">
       
            <button class="basis-1/3 border-purplebg border-[0.5px] rounded">
                <nuxt-link to="/brands/dashboard/campaign-timeline">
                    Back
                </nuxt-link>
            </button>

            <button  @click="isOpen = true" class="basis-2/3  bg-[#5331E8] rounded p-3">
                Create Campaign
            </button>
        </div>
    </div>
</template>