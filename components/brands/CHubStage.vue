

<template>
    <div class="w-full flex justify-between  bg-white dark:bg-vDarkBlue ">
        <div 
        :class="[ 'basis-1/4 mr-[0.1px] flex items-center justify-center gap-2  text-center p-6 border-b-2 border-b-[#5D43CB]', campaign ? 'border-b-[#5D43CB]' : 'border-none' ]" >
            <button v-if="campaign" class="rounded-full bg-purplebtn text-purplebtn  border h-8 w-8 flex items-center justify-center   text-xs" >
                <Check :color=bg />
            </button>
            <button v-else class="rounded-full border-purplebtn text-purplebtn  border h-6 w-6  text-xs">
                1
            </button>  
            
            Campaign
        </div>
        <div class="w-[1px] bg-[#DCDCDC] dark:bg-[#464160]" >

        </div>
        <div 
        :class="[ 'basis-1/4 mr-[0.1px] flex items-center justify-center gap-2  text-center p-6 border-b-2 border-b-[#5D43CB]', requirements && campaign ? 'border-none' : 'dark:border-b-[#5D43CB]' ]" 
        >
            <button class="rounded-full border border-purplebtn text-purplebtn h-6 w-6  text-xs">
                2
            </button>  Requirements
        </div>
        <div class="w-[1px] bg-[#DCDCDC] dark:bg-[#464160]" >

        </div>
        <div 
            :class="[ 'basis-1/4 mr-[0.1px] flex items-center justify-center gap-2  text-center p-6 border-b-2 border-b-[#5D43CB]', deliverables ? 'border-none' : 'dark:border-b-[#5D43CB]' ]"
        >
            <button class="rounded-full border border-purplebtn text-purplebtn h-6 w-6  text-xs">
                3
            </button>  Deliverables
        </div>
        <div class="w-[1px] bg-[#DCDCDC] dark:bg-[#464160]" >

        </div>
        <div class=" basis-1/4 flex items-center justify-center gap-2  text-center p-6 " >
            <button class="rounded-full border border-purplebtn text-purplebtn h-6 w-6  text-xs">
                4
            </button>  
            Compensation
        </div>
    </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next';
const bg = ref('white')
const props = defineProps({
    campaign: Boolean,
    requirements: Boolean,
    deliverables: Boolean,
    compensation: Boolean
  
});

</script>