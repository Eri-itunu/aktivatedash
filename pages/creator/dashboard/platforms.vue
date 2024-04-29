<script>
// For Nuxt Bridge

// For Nuxt 3
definePageMeta({
  layout: 'dashboard',
  colorMode:'dark'
})

const isOpen = ref(true)

</script>


<template>
    <div class="flex justify-between items-end mb-10">
        <p class="text-white" >2/5 Accounts Linked</p>

        <button label="Open" @click="isOpen = true" class="bg-[#5331E8] text-white rounded-[100px] px-4 py-2 ">
            Link Other Accounts
        </button>

    </div>

        <UButton label="Open" @click="isOpen = true" />

        <UModal v-model="isOpen" prevent-close>
                    <div class="flex flex-col">
                        <div class="flex relative justify-center  bg-purplelabel rounded-t-lg">
                            <UButton color="black" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 absolute top-0 right-0" @click=" navigateTo('/brands/dashboard')" />
                            <img src="../../../../assets/images/created.svg" alt="">
                        </div>
                        <div class="flex flex-col justify-center items-center px-16 pt-6 pb-20">
                            <div>
                                <p class="text-center text-2xl text-purplelabel font-bold">Campaign Created</p>
                                <p class="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit.  </p>
                            </div>
                            

                            <nuxt-link class="w-full p-3 rounded flex justify-center text-center items-center bg-[#5331E8]" to="/brands/dashboard/campaigns">
                                <p class="text-center">View Campaigns</p>
                            </nuxt-link>
                        </div>
                    </div>
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