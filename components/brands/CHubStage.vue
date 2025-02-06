

<template>
    <div class="w-full flex  justify-between   bg-white dark:bg-vDarkBlue ">
        <div :class="[ 'p-1 ] md:p-6  flex items-center flex-col justify-center basis-1/5' , isCampaign ? 'border-b-[#5D43CB] border-b-2 ' : 'border-none']" >
         
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
        <div :class="[ 'p-1 ] md:p-6 flex items-center flex-col justify-center basis-1/5', isRequirements ? 'border-b-[#5D43CB] border-b-2  ' : 'border-none']"  >
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
        <div :class="[ 'p-1 md:p-6 ] flex items-center flex-col justify-center basis-1/5 ',  isDeliverable ? 'border-b-[#5D43CB] border-b-2 ': 'border-none']"  >
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
        <div :class="[ 'p-1 md:p-6 flex ] items-center flex-col justify-center basis-1/5', isCompensation  ? 'border-b-[#5D43CB] border-b-2' : 'border-none']"  >
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

        <div :class="[ 'p-1 md:p-6 flex  items-center flex-col justify-center basis-1/5', isPreview ? 'border-b-[#5D43CB] ': '']"  >
            <button class="rounded-full border border-purplebtn text-purplebtn h-6 w-6  text-xs">
                5
            </button>  
            <p class="hidden lg:block" >Preview</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next';
const route = useRoute();
const bg = ref('white')
const props = defineProps({
    campaign: Boolean,
    requirements: Boolean,
    deliverables: Boolean,
    compensation: Boolean,
    preview: Boolean
  
});

const isCompensation = computed<boolean>(() => route.path.includes('compensation'))
const isDeliverable = computed<boolean>(
  () => route.path.includes('deliverables')
);
const isRequirements = computed<boolean>(() => route.path === "/brands/dashboard/collaborationHub/campaign/requirements");
const isPreview = computed<boolean>(() => route.path === "/brands/dashboard/collaborationHub/campaign/preview");

const isCampaign = computed<boolean>(() => route.path === "/brands/dashboard/collaborationHub/campaign");

</script>