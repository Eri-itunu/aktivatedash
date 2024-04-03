<script>

definePageMeta({
  colorMode: 'light',
})
</script>


<template>
    <nuxt-link to="/">
        <div class="p-4">
        <signBlackButton message="SignUp"  />
    </div>
    </nuxt-link>

    <div class="px-4 md:px-16 mb-24 flex flex-col gap-6">
        <h2 class="text-3xl font-semibold">Login to your Account</h2>
        <p class="text-[#6D6B76]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </div>

    <div class="flex flex-col gap-20">
        <div class="flex flex-col  md:flex-row gap-4 w-full px-4 md:px-16">
                
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Email </label>
                    <input type="email" placeholder="Your Email Address" class="border rounded border-black py-3 px-2">
                </div>
        
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Password</label>
                    <input type="password" placeholder="Your Password" class="border rounded   border-black py-3 px-2">
                </div>
                
            </div>
        
            <nuxt-link to="/dashboard">
                <authButton message="Go To Dashboard "/>
            </nuxt-link>
    </div>
</template>