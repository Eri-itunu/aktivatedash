<script >
import { ref } from 'vue';

    definePageMeta({
    layout: 'brands',
    }) 

    const dropdownSocials = ref(false)
    const checkedNames = ref([])



    function dropSocial(){
        dropdownSocials.value = !dropdownSocials.value
    }
</script>

<template>

    <brandsCampaignStage/>

    <div class="bg-vDarkBlue p-4 mt-5 flex flex-col gap-4">

        <div class="flex gap-2">
            
            
        </div>

        <brandsInfluencerSelect/>

    </div>

    <div class="flex gap-2 pt-4">

        <nuxt-link class="basis-1/3 border-purplebg border-[0.5px] flex items-center justify-center rounded" to="/brands/dashboard/create-campaign">
            <div>
               Back
            </div>
         </nuxt-link>
        <nuxt-link class="basis-2/3 bg-[#5331E8] flex items-center justify-center rounded p-3" to="/brands/dashboard/campaign-timeline">
            <div>
                Next
            </div>
        </nuxt-link>
    </div>

</template>