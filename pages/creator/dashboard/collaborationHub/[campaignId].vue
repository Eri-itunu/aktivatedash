<script setup lang="ts">
import { Gift, Banknote, Instagram, ArrowLeft, CircleCheckBig } from 'lucide-vue-next';

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="flex flex-col gap-8 px-4   py-12" >
        
        <nuxt-link class="flex gap-2" to="/creator/dashboard/collaborationHub">
            <ArrowLeft />
            <p class="font-bold text-xl">Campaigns</p>
        </nuxt-link>
        <div class="bg-transparent p-4 rounded-md">
            <div class="flex flex-col mt-16 items-center gap-4 px-3 md:px-12 lg:px-16">
                <img src="/assets/collabHubSample.png" class="w-[900px] h-[400px]">

                <div class="flex flex-col gap-2 border-b px-2">
                    <h2 class="text-[#5331E8]" >Jaw Towers</h2>
                    <h2 class="font-bold text-xl">UGC Actors Needed For Chewing Gum Advert</h2>
                    <p class="flex gap-2 items-center"> <Gift class=" bg-[#E9E6F3] h-8 border rounded-full w-8 p-2 " /> Paid Cmapaign</p>
                    <p class="flex gap-2 items-center"> <Banknote class=" bg-[#E9E6F3] h-8 border rounded-full w-8 p-2 " /> Product valued at $200</p>
                    <p class="text-sm">Looking for mainly male actors aged from 20 - 50 to create an advert for our newest product release. You will be selling tough chewing gum designed to exercise the muscle in your jaw and face We are looking for all types of creators in the music niche to</p>
                </div>     
                
                <div class="flex justify-start flex-col w-full py-8">
                    <h1 class="font-bold">Aplication Close Date</h1>
                    <p>November 28, 2024</p>
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-6 py-4 px-3 md:px-12 lg:px-16" >
                <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="rounded-[8px] shadow-md bg-white dark:bg-vDarkBlue border p-4">
                        <h2 class="font-semibold">Requirements</h2>
                        <p>you must meet the following requirements to participate in this campaign</p>

                       

                        <div class=" overflow-x-auto border mt-5 shadow-md sm:rounded-lg">
                            <table
                                class="w-full text-sm text-left rtl:text-right"
                            >
                                
                                <tbody>
                                    <tr>
                                    <th class=" text-left border-r px-4 py-2 border-t rounded-tl-lg">
                                        Location
                                    </th>
                                    <td class="px-4 border-t py-2">New York</td>
                                    </tr>
                                    <tr>
                                    <th class=" text-left px-4 border-r border-t py-2">Niche</th>
                                    <td class="px-4 border-t py-2">Technology</td>
                                    </tr>
                                    <tr>
                                    <th class=" text-left px-4 border-r border-t py-2">Platform</th>
                                    <td class="px-4 py-2 border-t">YouTube</td>
                                    </tr>
                                    <tr>
                                    <th class=" text-left px-4 border-r border-t py-2">Age</th>
                                    <td class="px-4 py-2 border-t">18-24</td>
                                    </tr>
                                    <tr>
                                    <th class=" text-left px-4 py-2 border-r border-t rounded-bl-lg">
                                        Gender
                                    </th>
                                    <td class="px-4 py-2 border-t rounded-br-lg">Male</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="rounded-[8px] shadow-md border p-4 bg-white dark:bg-vDarkBlue" >
                        <h1 class="font-semibold">About the brand</h1>
                        <p>you must meet the following requirements to participate in this campaign. you must meet the following requirements to participate in this campaignyou must meet the following requirements to participate in this campaign youquirements to participate in this campaignyou must meet the following requirements to participate in this campaign </p>
                    </div>
                </div>



                <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="flex flex-col gap-2 shadow-md rounded-lg bg-white dark:bg-vDarkBlue p-4 border">
                        <h1 class="font-semibold">Compensation</h1>

                        <button class="bg-[#DEF4FF] rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                            <CircleCheckBig color="#54ABE8" />
                            <p class="text-[#54ABE8]">Paid Campaign: N200,000</p>
                        </button>

                        <h2>Creators will receive two bags and a fridge</h2>
                        <p>Retail Value:  N18,000</p>
                    </div>


                    <div class="flex flex-col gap-2 shadow-md rounded-lg bg-white dark:bg-vDarkBlue p-4 border">
                        <h1 class="font-semibold">Deliverable</h1>

                        <div class="flex gap-2">
                            <span class="bg-white dark:bg-dashbg rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                            <Instagram />
                           
                            </span>
                            <span class="bg-white dark:bg-dashbg rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                             
                                <p class="">Story (video)</p>
                            </span>
                        </div>

                        <span>
                            <h1>Do's</h1>
                            <li>Put picture in blah blah</li>
                            <li>Put picture in blah blah</li>
                            <li>Put picture in blah blah</li>
                        </span>

                        <span>
                            <h1>Dont's</h1>
                            <li>Put picture in blah blah</li>
                            <li>Put picture in blah blah</li>
                            <li>Put picture in blah blah</li>
                        </span>

                        <span>
                            <h1>Caption</h1>
                            <p>Something</p>
                        </span>

                        <span>
                            <h1>Hashtag</h1>
                            <p>Something</p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="w-full border-t p-4 flex items-center justify-center" >
                <button class="bg-[#5331E8] rounded-[40px] px-8 py-2 text-white">
                    Opt in
                </button>
            </div>
        </div>
    </div>

</template>