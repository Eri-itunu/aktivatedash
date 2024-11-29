<script setup>
import { CircleCheckBig, Instagram } from 'lucide-vue-next';
</script>

<template>
    <div class="flex flex-col gap-8 p-3" >
        
        <div class="flex flex-col md:flex-row items-center gap-4">
            <img src="/assets/images/chubstock.png">

            <div class="flex flex-col gap-2">
                <span>
                    <h2 class="font-bold text-sm text-black dark:text-white" >Campaign details</h2>
                    <p>This is a photography capaign. Each creator is required to do a lot and not so much to receive money</p>
                </span>

                <span>
                    <h2 class="font-bold text-sm text-black dark:text-white">Company Name </h2>
                    <p>Adidas</p>
                </span>

                <span>
                    <h2 class="font-bold text-sm text-black dark:text-white">Website</h2>
                    <p>Aktivate.com</p>
                </span>

                <span>
                    <h2 class="font-bold text-sm text-black dark:text-white">Campaign Close Date</h2>
                    <p>15 October, 2024</p>
                </span>

            </div>          
        </div>

        <div class="flex flex-col md:flex-row gap-6" >
                <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="rounded-[8px] shadow-md bg-white dark:bg-vDarkBlue border p-4">
                        <h2>Requirements</h2>
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
                        <h1>About the brand</h1>
                        <p>you must meet the following requirements to participate in this campaign. you must meet the following requirements to participate in this campaignyou must meet the following requirements to participate in this campaign youquirements to participate in this campaignyou must meet the following requirements to participate in this campaign </p>
                    </div>
                </div>



                <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="flex flex-col gap-2 rounded-lg bg-white dark:bg-vDarkBlue p-4 border">
                        <h1>Compensation</h1>

                        <button class="bg-[#DEF4FF] rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                            <CircleCheckBig color="#54ABE8" />
                            <p class="text-[#54ABE8]">Paid Campaign: N200,000</p>
                        </button>

                        <h2>Creators will receive two bags and a fridge</h2>
                        <p>Retail Value:  N18,000</p>
                    </div>


                    <div class="flex flex-col gap-2 rounded-lg bg-white dark:bg-vDarkBlue p-4 border">
                        <h1>Deliverable</h1>

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
    </div>

</template>