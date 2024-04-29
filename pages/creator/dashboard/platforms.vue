<script setup lang="ts">
// For Nuxt Bridge

// For Nuxt 3
definePageMeta({
  layout: 'dashboard',
  colorMode:'dark'
})

const isOpen = ref(false)

</script>


<template>
    <div class="flex justify-end mt-5 items-end mb-10">
        

        <button label="Open" @click="isOpen = true" class="bg-[#5331E8] text-white rounded-[100px] px-4 py-2 ">
            Link Social Media Accounts
        </button>

    </div>



        
        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    Link Accounts
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
                </div>
                </template>

                <div class="flex flex-col gap-2 ">
                    <h4>Link Manually</h4>
                    <p>To link social media platforms and retrieve key metrics click on your app of choice, fill in your details and start getting feedback!</p>

                    <div class="flex mt-4 gap-2 items-center">
                        <button>
                            <img src="../../../assets/icons/facebook.svg" alt="">
                        </button>
                        <div class="w-20 h-px bg-[#464160]"></div>
                        <button>
                            <img src="../../../assets/icons/Insta.svg" alt="">
                        </button>
                        <div class="w-20 h-px bg-[#464160]"></div>
                        <button>
                            <img src="../../../assets/icons/snapchat.svg" alt="">
                        </button>
                        <div class="w-20 h-px bg-[#464160]"></div>
                        <button>
                            <img src="../../../assets/icons/tiktok.svg" alt="">
                        </button>
                    </div>
                </div>
            </UCard>
        </UModal>

   <div class="flex flex-col gap-4">
    <div class="flex flex-row rounded-lg bg-vDarkBlue text-white ">
        <div class="flex items-center justify-center py-8 w-1/12 border-r-2 border-darkBlue ">
            <img src="../../../assets/icons/Insta.svg" class="h-10 w-auto" alt="">
        </div>

        <div class="w-11/12 flex  ">
            <div class="w-1/3 border-r-2 py-4 border-darkBlue">
                <div class="flex justify-between gap-2 items-center px-4">
                    <div class="flex gap-2 items-center">
                        <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
                        <div> Followers </div>
                    </div>
                   
                </div>
                <!-- End Top part -->

                <!-- Middle -->
                <div class=" py-3 border-b border-dashed border-darkBlue px-4">
                    <div class="flex justify-between gap-2 items-end w-full h-full">
                        <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5">21,400</p>
                        <div class="hidden lg:block w-1/2 h-[3.8rem]">
                        </div>
                    </div>
                </div>
                <!-- End Middle -->

                <!-- Bottom -->
                <div class="flex justify-between gap-2 items-center pt-3 px-4">
                    <div class="flex gap-2">
                        <img src="~/assets/icons/up-green.svg" alt="">
                        <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
                    </div>
                    <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
                </div>
            </div>
            <div class="w-1/3 border-r-2 py-4 border-darkBlue">
                <div class="flex justify-between gap-2 items-center px-4">
                    <div class="flex gap-2 items-center">
                        <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
                        <div> Engagement Reach </div>
                    </div>
                   
                </div>
                <!-- End Top part -->

                <!-- Middle -->
                <div class=" py-3 border-b border-dashed border-darkBlue px-4">
                    <div class="flex justify-between gap-2 items-end w-full h-full">
                        <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5">21%</p>
                        <div class="hidden lg:block w-1/2 h-[3.8rem]">

                        </div>
                    </div>
                </div>
                <!-- End Middle -->

                <!-- Bottom -->
                <div class="flex justify-between gap-2 items-center pt-3 px-4">
                    <div class="flex gap-2">
                        <img src="~/assets/icons/up-green.svg" alt="">
                        <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
                    </div>
                    <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
                </div>
            </div>
            <div class="w-1/3 py-4">
                <div class="flex justify-between gap-2 items-center px-4">
                    <div class="flex gap-2 items-center">
                        <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
                        <div> Audience Reach </div>
                    </div>

                </div>
                <!-- End Top part -->

                <!-- Middle -->
                <div class=" py-3 border-b border-dashed border-darkBlue px-4">
                    <div class="flex justify-between gap-2 items-end w-full h-full">
                        <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5"> 213,100,456</p>
                        <div class="hidden lg:block w-1/2 h-[3.8rem]">
                       
                        </div>
                    </div>
                </div>
                <!-- End Middle -->

                <!-- Bottom -->
                <div class="flex justify-between gap-2 items-center pt-3 px-4">
                    <div class="flex gap-2">
                        <img src="~/assets/icons/down-red.svg" alt="">
                        <p class="text-sm md:text-lg text-red1"> 21.45%</p>
                    </div>
                    <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
                </div>
            </div>
            
        </div>

        

        

    </div>

    <div class="flex flex-row rounded-lg bg-vDarkBlue text-white ">
        <div class="flex items-center justify-center py-8 w-1/12 border-r-2 border-darkBlue ">
            <img src="../../../assets/icons/facebook.svg" class="h-10 w-auto" alt="">
        </div>

        <div class="w-11/12 flex  ">
            <div class="w-1/3 border-r-2 py-4 border-darkBlue">
                <div class="flex justify-between gap-2 items-center px-4">
                    <div class="flex gap-2 items-center">
                        <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
                        <div> Followers </div>
                    </div>
                   
                </div>
                <!-- End Top part -->

                <!-- Middle -->
                <div class=" py-3 border-b border-dashed border-darkBlue px-4">
                    <div class="flex justify-between gap-2 items-end w-full h-full">
                        <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5">21,400</p>
                        <div class="hidden lg:block w-1/2 h-[3.8rem]">
                        </div>
                    </div>
                </div>
                <!-- End Middle -->

                <!-- Bottom -->
                <div class="flex justify-between gap-2 items-center pt-3 px-4">
                    <div class="flex gap-2">
                        <img src="~/assets/icons/up-green.svg" alt="">
                        <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
                    </div>
                    <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
                </div>
            </div>
            <div class="w-1/3 border-r-2 py-4 border-darkBlue">
                <div class="flex justify-between gap-2 items-center px-4">
                    <div class="flex gap-2 items-center">
                        <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
                        <div> Engagement Reach </div>
                    </div>
                   
                </div>
                <!-- End Top part -->

                <!-- Middle -->
                <div class=" py-3 border-b border-dashed border-darkBlue px-4">
                    <div class="flex justify-between gap-2 items-end w-full h-full">
                        <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5">21%</p>
                        <div class="hidden lg:block w-1/2 h-[3.8rem]">

                        </div>
                    </div>
                </div>
                <!-- End Middle -->

                <!-- Bottom -->
                <div class="flex justify-between gap-2 items-center pt-3 px-4">
                    <div class="flex gap-2">
                        <img src="~/assets/icons/up-green.svg" alt="">
                        <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
                    </div>
                    <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
                </div>
            </div>
            <div class="w-1/3 py-4">
                <div class="flex justify-between gap-2 items-center px-4">
                    <div class="flex gap-2 items-center">
                        <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
                        <div> Audience Reach </div>
                    </div>

                </div>
                <!-- End Top part -->

                <!-- Middle -->
                <div class=" py-3 border-b border-dashed border-darkBlue px-4">
                    <div class="flex justify-between gap-2 items-end w-full h-full">
                        <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5"> 213,100,456</p>
                        <div class="hidden lg:block w-1/2 h-[3.8rem]">
                       
                        </div>
                    </div>
                </div>
                <!-- End Middle -->

                <!-- Bottom -->
                <div class="flex justify-between gap-2 items-center pt-3 px-4">
                    <div class="flex gap-2">
                        <img src="~/assets/icons/down-red.svg" alt="">
                        <p class="text-sm md:text-lg text-red1"> 21.45%</p>
                    </div>
                    <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
                </div>
            </div>
            
        </div>

        

        

    </div>
   </div>
</template>