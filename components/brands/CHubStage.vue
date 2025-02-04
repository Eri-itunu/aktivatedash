

<template>
    <div class="w-full flex justify-between  bg-white dark:bg-vDarkBlue ">
        <div 
        :class="[ 'basis-1/4 mr-[0.1px] flex items-center justify-center gap-2  text-center p-1 md:p-6 border-b-2 border-b-[#5D43CB]', campaign ?  'border-none' :'border-b-[#5D43CB]'  ]" >
            <button v-if="campaign" class="rounded-full bg-purplebtn text-purplebtn  border h-4 md:h-8 w-4 md:w-8 flex items-center justify-center   text-xs" >
                <Check :color=bg />
            </button>
            <button v-else class="rounded-full border-purplebtn text-purplebtn  border h-6 w-6  text-xs">
                1
            </button>  
            
           <p class="hidden lg:block" > Campaign</p>
        </div>
        <div class="w-[1px] bg-[#DCDCDC] dark:bg-[#464160]" >

        </div>
        <div 
        :class="[ 'basis-1/4 mr-[0.1px] flex items-center justify-center gap-2  text-center p-1 md:p-6 border-b-2 ', campaign && !requirements ? 'border-b-[#5D43CB]' : 'border-none', requirements && campaign ? 'border-none' :'border-b-[#5D43CB]'  ]" 
        >
            <button v-if="requirements" class="rounded-full bg-purplebtn text-purplebtn  border h-4 md:h-8 w-4 md:w-8 flex items-center justify-center   text-xs" >
                <Check :color=bg />
            </button>
            <button v-else class="rounded-full border-purplebtn text-purplebtn  border h-6 w-6  text-xs">
                2
            </button>   
            <p class="hidden lg:block" >Requirements </p>
            
        </div>
        <div class="w-[1px] bg-[#DCDCDC] dark:bg-[#464160]" >

        </div>
        <div 
            :class="[ 'basis-1/4 mr-[0.1px] flex items-center justify-center gap-2  text-center p-1 md:p-6 border-b-2 ', requirements ?  'dark:border-b-[#5D43CB]' :'border-none', requirements && deliverables ? 'border-none' :'border-b-[#5D43CB]'  ]"
        >
            <button v-if="deliverables" class="rounded-full bg-purplebtn text-purplebtn  border h-4 md:h-8 w-4 md:w-8 flex items-center justify-center   text-xs" >
                <Check :color=bg />
            </button>
            <button v-else class="rounded-full border-purplebtn text-purplebtn  border h-6 w-6  text-xs">
                3
            </button>  
            <p class="hidden lg:block" >Deliverables</p>
        </div>
        <div class="w-[1px] bg-[#DCDCDC] dark:bg-[#464160]" >

        </div>
        <div  :class="[ 'basis-1/4 mr-[0.1px] flex items-center justify-center gap-2 border-b-[#5D43CB] border-b-2  text-center p-1 md:p-6  ', compensation ?  'dark:border-none' :'border-b-[#5D43CB]' ]" >
            <button v-if="compensation" class="rounded-full bg-purplebtn text-purplebtn  border h-4 md:h-8 w-4 md:w-8 flex items-center justify-center   text-xs" >
                <Check :color=bg />
            </button>
            <button v-else class="rounded-full border-purplebtn text-purplebtn  border h-6 w-6  text-xs">
                4
            </button> 
            <p class="hidden lg:block">Compensation</p>
        </div>
        <div class="w-[1px] bg-[#DCDCDC] dark:bg-[#464160]" >

        </div>

        <div  :class="[ 'basis-1/4 mr-[0.1px] flex items-center justify-center gap-2  text-center p-1 md:p-6 border-b-2 ', preview ?  'dark:border-b-[#5D43CB]' :'border-none' ]" >
            <button class="rounded-full border border-purplebtn text-purplebtn h-6 w-6  text-xs">
                5
            </button>  
            <p class="hidden lg:block" >Preview</p>
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
    compensation: Boolean,
    preview: Boolean
  
});

</script>