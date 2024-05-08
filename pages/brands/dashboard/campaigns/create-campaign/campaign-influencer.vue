<script >
import { ref } from 'vue';

    definePageMeta({
    layout: 'brands',
    
    
    })

    
    const dropdownSocials = ref(false)
    const dropdownMedia = ref(false)



    function dropSocial(){
        dropdownSocials.value = !dropdownSocials.value
        console.log('Hello s')
    }
    function dropMedia(){
        dropdownMedia.value = !dropdownMedia.value
    }
</script>

<template>

    <div class="">
        <brandsCampaignStage v-bind:content = "true"  />

        <div class="bg-vDarkBlue p-4 mt-5 flex flex-col gap-4">
            
            

            <BrandsInfluencerSelect/>

        </div>

        <div class="flex gap-2 pt-4">

            <nuxt-link class="basis-1/3  text-white border-purplebg border-[0.5px] flex items-center justify-center rounded" to="/brands/dashboard/campaigns/create-campaign">
                <div>
                Back
                </div>
            </nuxt-link>
            <nuxt-link class="basis-2/3 bg-[#5331E8]  text-white flex items-center justify-center rounded p-3" to="/brands/dashboard/campaigns/create-campaign/campaign-timeline">
                <div>
                    Next
                </div>
            </nuxt-link>
        </div>
    </div>

</template>