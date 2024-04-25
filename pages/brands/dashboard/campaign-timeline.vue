<script setup lang="ts" >
import { ref } from 'vue';


    definePageMeta({
    layout: 'brands',
    
    })
    import { format } from 'date-fns'
    const start_date = ref(new Date())
    const end_date = ref(new Date())

    const campaignFormStore = useCampaignFormStore();
    const form = campaignFormStore.$state;

    
</script>

<template>
    <brandsCampaignStage/>
    <div class="bg-vDarkBlue flex items-center mt-5 flex-col gap-5 p-16">

        <div class="flex w-full gap-5">
            <div class="basis-1/2 flex flex-col">
                <p  >Start Date</p>

                    <UPopover  :popper="{ placement: 'bottom-start' }">
                        <UButton class="w-full  p-3 border-2  border-darkBlue" icon="i-heroicons-calendar-days-20-solid" :label="format(form.start_date, 'd MMM, yyy')" />

                        <template #panel="{ close }">
                            <DatePicker v-model="form.start_date" is-required @close="close" />
                        </template>
                    </UPopover>

            </div>

            <div class="basis-1/2 flex flex-col">
                <p  >End Date</p>

                    <UPopover  :popper="{ placement: 'bottom-start' }">
                        <UButton class="w-full p-3 border-2 border-darkBlue"  
                        :label="format(form.end_date, 'd MMM, yyy')" 
                        icon="i-heroicons-calendar-days-20-solid" 
                        />

                        <template #panel="{ close }">
                            <DatePicker v-model="form.end_date" is-required @close="close" />
                        </template>
                    </UPopover>

            </div>
          
        </div>

        <div class="flex w-full gap-5">
            <div class="flex basis-1/2 flex-col">
                <p>Budget Per Post</p>
                <input v-model="form.amount_posts" class="border-2 p-2 bg-transparent rounded border-darkBlue" type="number">
            </div>
            <div class="flex basis-1/2 flex-col">
                <p>Number of posts per influencer</p>
                <input class="border-2 p-2 bg-transparent border-darkBlue" type="number">
            </div>
        </div>

    </div>

    <div class="flex gap-2 pt-4">
       

            <nuxt-link class="basis-1/3 border-purplebg border-[0.5px] rounded flex items-center justify-center" to="/brands/dashboard/create-campaign">
                <div>
                    Back
                </div>
            </nuxt-link>


        <nuxt-link to="/brands/dashboard/select-influencer" class="basis-2/3  bg-[#5331E8] rounded p-3 flex justify-center items-center">
            <div>
                Next
            </div>
        </nuxt-link>
        
    </div>
</template>