<template>


<div class="object-contain">
        <div class="flex p-4 justify-end">
            <button class="bg-black text-white px-6 py-2 rounded-[50px]">Login</button>
        </div>
        <div class="px-4 md:px-16 mb-12">
            <h2 class="text-3xl font-semibold">Create New Account</h2>
        </div>

        <form action="#" class="flex flex-col gap-6">

            <div class="flex flex-col  md:flex-row gap-4 w-full px-4 md:px-16">
                
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">First Name</label>
                    <input type="text" placeholder="Name" class="border rounded border-black py-3 px-2">
                </div>

                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Last Name</label>
                    <input type="text" placeholder="Name" class="border rounded   border-black py-3 px-2">
                </div>
                
            </div>

            <div class="flex flex-col md:flex-row gap-4 w-full px-16">
                
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Email Address </label>
                    <input type="text" placeholder="Name" class="border rounded border-black py-3 px-2">
                </div>

                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">First Name</label>
                    <input type="text" placeholder="Name" class="border rounded   border-black py-3 px-2">
                </div>
                
            </div>

            <nuxt-link to="/verifyEmail">
                <div class="px-16">
                    <button class="rounded bg-[#5331E8] py-4 w-full text-white">
                        Create Account
                    </button>
                </div>
            </nuxt-link>

            <div class="text-center">
                <p>or</p>
            </div>

            <div class="text-center">
                    Sign up with Social Media
            </div>


            

            

            <div class="flex flex-row gap-2 items-center justify-center">
                <img class="object-contain" src="/assets/icons/x.svg" alt="">
                <img class="object-contain" src="/assets/icons/Insta.svg" alt="">
                <img class="object-contain" src="/assets/icons/snapchat.svg" alt="">
                <img class="object-contain" src="/assets/icons/tiktok.svg" alt="">
                <img class="object-contain" src="/assets/icons/facebook.svg" alt="">
            </div>

        
        </form>

    </div>





</template>