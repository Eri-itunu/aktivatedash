<script setup lang="ts">
definePageMeta({
  layout: 'brands',
  colorMode: 'light'
})


</script>


<template>
   <div class="flex flex-col h-screen">
        <div class="flex items-center justify-center place-items-center basis-4/5">
            <div class="flex flex-col  ">
                <img src="../../assets/icons/Brand-Aktivate-Icon.svg" class="h-20" alt="">

                <h1 class="text-center">Welcoome back</h1>
                <p class="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nam quae asperiores aliquam! </p>

                

                <div class="flex flex-col items-center justify-center">
                    <div class="flex flex-col w-full md:w-1/2">
                        <label for="">Email </label>
                        <input type="email" placeholder="Your Email Address" class="border rounded border-black py-3 px-2">
                    </div>
            
                    <div class="flex flex-col w-full md:w-1/2">
                        <label for="">Password</label>
                        <input type="password" placeholder="Your Password" class="border rounded   border-black py-3 px-2">
                    </div>
                </div>

                <authButton message = "Go To Dashboard" />
            </div>
        </div>

        <div class=" flex justify-between relative basis-1/5 items-end">
            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 186.svg" alt="">
            </div>

            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 188.svg" alt="">
            </div>

            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 187.svg" alt="">
            </div>
            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 185.svg" alt="">
            </div>
            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 184.svg" alt="">
            </div>
            <div>
                <img class="object-cover" src="../../assets/images/Brands/path384.svg" alt="">
            </div>
            
            <div>
                <img class="object-cover" src="../../assets/images/Brands/path382.svg" alt="">
            </div>
            

            <div>
                <img class="object-cover" src="../../assets/images/Brands/Group 183.svg" alt="">
            </div>

        </div>
   </div>
</template>