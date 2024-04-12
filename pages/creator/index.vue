<script>
// For Nuxt Bridge

// For Nuxt 3
definePageMeta({
  colorMode: 'light',
})
</script>



<template>

<div class="container mx-auto p-4">
        <nuxt-link to="/creator/login">
            <signBlackButton message="Login"/>
        </nuxt-link>

        <nuxt-link to="/brands">
            <signBlackButton message="Brands Login"/>
        </nuxt-link>
        
        <div class="px-4 md:px-16 mb-12">
            <h2 class="text-3xl font-semibold">Create New Account</h2>
        </div>

        <form action="#" class="flex flex-col gap-6">

            <div class="flex flex-col  md:flex-row gap-4 w-full px-4 md:px-16">
                
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">First Name</label>
                    <input type="text" placeholder="" class="border rounded border-black py-3 px-2">
                </div>

                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Last Name</label>
                    <input type="text" placeholder="" class="border rounded   border-black py-3 px-2">
                </div>
                
            </div>

            <div class="flex flex-col  md:flex-row gap-4 w-full px-4 md:px-16">
                
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Email Address </label>
                    <input type="text" placeholder="" class="border rounded border-black py-3 px-2">
                </div>

                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Phone number</label>
                    <input type="text" placeholder="" class="border rounded   border-black py-3 px-2">
                </div>
                
            </div>

            <nuxt-link to="creator/verifyEmail">
                <authButton message="Create Account"/>
            </nuxt-link>

            <div class="text-center">
                <p>or</p>
            </div>

            <div class="text-center">
                    Sign up with Social Media
            </div>


            

            

            <div class="flex flex-row gap-2 items-center px-3 md:px-1 justify-center">
                <img class="object-scale-down h-12 w-12" src="/assets/icons/x.svg" alt="">
                <img class="object-contain h-12 w-12" src="/assets/icons/Insta.svg" alt="">
                <img class="object-contain h-12 w-12" src="/assets/icons/snapchat.svg" alt="">
                <img class="object-contain h-12 w-12" src="/assets/icons/tiktok.svg" alt="">
                <img class="object-contain h-12 w-12" src="/assets/icons/facebook.svg" alt="">
            </div>

        
        </form>

</div>





</template>