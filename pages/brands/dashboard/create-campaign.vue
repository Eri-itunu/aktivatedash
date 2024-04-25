<script setup lang="ts">


    definePageMeta({
        layout: "brands",
    })

    const createBrandCampaignStore = useCreateBrandCampaignStore();

    const { headline, description, requirements, platformType, contentType } = storeToRefs(createBrandCampaignStore);


    const isEmptyArray = computed( () => platformType.value.length === 0);

    const isEmptyMedia = computed( () => contentType.value.length === 0);

    const dropdownSocials = ref(false)
    const dropdownMedia = ref(false)



    function dropSocial(){
        dropdownSocials.value = !dropdownSocials.value
    }
    function dropMedia(){
        dropdownMedia.value = !dropdownMedia.value
    }
</script>

<template>
    <div class="px-2 flex text-white flex-col py-4 gap-4">


        <brandsCampaignStage/>

        <form action="">
            <div class="bg-[#090618] rounded-lg  flex flex-col gap-4 p-8">
            <div>
                <p class="text-[#E1DCF7] mb-1">Campaign Headline</p>
                <input v-model="headline" class="border-[0.5px] p-2 rounded-md w-full bg-transparent " type="text" placeholder="E.g: Launching a new product in Lagos..."
                >
            </div>

            <div>
                <p class="text-[#E1DCF7]">Campaign Description</p>
                <textarea v-model="description" class="border-[0.5px] p-2 rounded-md w-full bg-transparent" name="" id="" cols="30" rows="5" required></textarea>
            </div>

            <div>
                <p class="text-[#E1DCF7]">Campaign Requirements</p>
                <textarea v-model="requirements" class="border-[0.5px] p-2 rounded-md w-full bg-transparent" name="" id="" cols="30" rows="5" required></textarea>
            </div>

            <div class="flex gap-2">
                <div class="relative basis-1/2 inline-block bg-transparent text-left">
                    <button @click="dropMedia" type="button" class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700  border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200  active:text-gray-800" id="options-menu" aria-haspopup="true" aria-expanded="true">
                        <div class="flex gap-1">
                            <p  v-if="isEmptyMedia">Select</p>
                            <div v-else  v-for="content in contentType" class="flex flex-row" :key="content">
                                <div class="rounded-[100px] px-2 py-[1.5px] text-white bg-[#231E37] flex ">
                                    {{ content }}
                                </div>
                            </div>
                        </div>


                        <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
                        </svg>
                    </button>

                    <div v-if="dropdownMedia" class="origin-top-right absolute right-0 mt-2  w-full rounded-md shadow-lg ring-1 bg-[#100C21] p-2 ring-black ring-opacity-5 focus:outline-none " >
                        <div class="flex gap-2">
                            <input type="checkbox" id="Photos" value="photos" v-model="contentType">
                            <label for="Photos">Photos</label>
                        </div>
                        <div class="flex gap-2">
                            <input type="checkbox" id="Videos" value="videos" v-model="contentType">
                            <label for="Videos">Videos</label>
                        </div>
                    </div>
                </div>

                <div  class="relative basis-1/2 inline-block bg-transparent text-left">
                    <button @click="dropSocial" class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700  border  border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200  active:text-gray-800" id="options-menu" aria-haspopup="true" aria-expanded="true">
                        <div class="flex gap-1">
                            <p  v-if="isEmptyArray">Select</p>
                            <div v-else  v-for="platform in platformType" :key="platform" class="flex flex-row">
                                <div class="rounded-[100px] px-2 py-[1.5px] text-white bg-[#231E37] flex ">
                                    {{ platform }}
                                </div>
                            </div>
                        </div>

                        <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
                        </svg>
                    </button>

                    <div v-if="dropdownSocials" class="origin-top-right absolute right-0 mt-2  w-full rounded-md shadow-lg ring-1 bg-[#100C21] p-2 ring-black ring-opacity-5 focus:outline-none " >
                        <div class="flex gap-2">
                            <input type="checkbox" id="Facebook" value="Facebook" v-model="platformType">
                            <label for="Facebook">Facebook</label>
                        </div>
                        <div class="flex gap-2">
                            <input type="checkbox" id="Twitter" value="Twitter" v-model="platformType">
                            <label for="Twitter">Twitter</label>
                        </div>
                        <div class="flex gap-2">
                            <input type="checkbox" id="Instagram" value="Instagram" v-model="platformType">
                            <label for="Instagram">Instagram</label>
                        </div>
                        <div class="flex gap-2">
                            <input type="checkbox" id="TikTok" value="TikTok" v-model="platformType">
                            <label for="TikTok">Tiktok</label>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p class="text-[#E1DCF7]">Upload Campaign Photos (Optional)</p>
                <div class="w-full border-[1px] flex flex-col gap-2 border-[#464160] border-dashed justify-center items-center p-8 rounded-lg">
                    <img src="../../../assets/icons/upload.svg" alt="">
                    <p>Drag and drop or choose File</p>
                </div>
            </div>


            </div>


        </form>

        <nuxt-link to="/brands/dashboard/select-influencer">
            <button class="w-full bg-[#5331E8] rounded p-3">
                Next
            </button>
        </nuxt-link>

    </div>
</template>