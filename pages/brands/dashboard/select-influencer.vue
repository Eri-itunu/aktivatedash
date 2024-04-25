<script >
import { ref } from 'vue';

    definePageMeta({
    layout: 'brands',
    
    })

    const dropdownSocials = ref(false)
    const checkedNames = ref([])

    const number = [1,2,3,4,5,6]


    function dropSocial(){
        dropdownSocials.value = !dropdownSocials.value            
    }
</script>

<template>

    <brandsCampaignStage/>

    <div class="bg-vDarkBlue p-4 mt-5 flex flex-col gap-4">
        
        <div class="flex gap-2">
            <div  class="relative basis-1/8 inline-block bg-transparent text-left">
                <button @click="dropSocial" class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700  border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200  active:text-gray-800" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    <p class="text-white">Rate Per Post</p>
                    

                    <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
                    </svg>
                </button>

                <div v-if="dropdownSocials" class="origin-top-right absolute right-0 mt-2  w-full rounded-md shadow-lg ring-1 bg-[#100C21] p-2 ring-black ring-opacity-5 focus:outline-none " >
                    <div class="flex gap-2">
                        <input type="checkbox" id="Facebook" value="Facebook" v-model="checkedNames">
                        <label for="Facebook">$100 - $200</label>
                    </div>
                    <div class="flex gap-2">
                        <input type="checkbox" id="Twitter" value="Twitter" v-model="checkedNames">
                        <label for="Twitter">$200-$300</label>
                    </div>
                </div>
            </div>
            <div  class="relative basis-1/8 inline-block bg-transparent text-left">
                <button @click="dropSocial" class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700  border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200  active:text-gray-800" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    <p class="text-white" >Gender</p>
                    <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
                    </svg>
                </button>

                <div v-if="dropdownSocials" class="origin-top-right absolute right-0 mt-2  w-full rounded-md shadow-lg ring-1 bg-[#100C21] p-2 ring-black ring-opacity-5 focus:outline-none " >
                    <div class="flex gap-2">
                        <input type="checkbox" id="MALE" value="MALE" v-model="checkedNames">
                        <label for="Facebook">MALE</label>
                    </div>
                    <div class="flex gap-2">
                        <input type="checkbox" id="FEMALE" value="FEMALE" v-model="checkedNames">
                        <label for="Twitter">FEMALE</label>
                    </div>
                </div>
            </div>
        </div>

        <brandsInfluencerSelect/>

    </div>

    <div class="flex gap-2 pt-4">

        <nuxt-link class="basis-1/3 border-purplebg border-[0.5px] flex items-center justify-center rounded" to="/brands/dashboard/create-campaign">
            <div>
               Back
            </div>
         </nuxt-link>
        <nuxt-link class="basis-2/3 bg-[#5331E8] flex items-center justify-center rounded p-3" to="/brands/dashboard/campaign-review">
            <div>
                Next
            </div>
        </nuxt-link>
    </div>

</template>