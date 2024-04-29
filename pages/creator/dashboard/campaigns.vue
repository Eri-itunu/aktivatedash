
<script setup lang="ts">
import  collabs from "../../../mock/collabs";


  definePageMeta({
  layout: 'dashboard',
  colorMode: 'dark'
})

const posts = [
{
    id: "001",
    date: "12-10-2024",
    time: "12:00"
},
{
    id: "002",
    date: "12-10-2024",
    time: "12:00"
},
{
    id: "003",
    date: "12-10-2024",
    time: "12:00"
},
]


</script>
 


<template>
  <div class="">
   
        <!-- <div class="flex flex-wrap items-center lg:justify-between justify-center">
          <div v-for="collab,i in collabs" :key="i"
            class="w-[49%] md:min-w-min min-w-full pb-2">
            <CampaignCard />
          </div>
        </div> -->
    
  </div>

  <!-- <div class="flex flex-wrap justify-center align-center gap-4">
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
  </div> -->

  

<div class="mx-4 mt-8 flex flex-col gap-5">
    <h1>Link Post To Campaigns</h1>
  <div class="relative overflow-x-auto shadow-md rounded-lg">
    
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Post Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Date Posted
                </th>
                <th scope="col" class="px-6 py-3">
                    Time
                </th>
                
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="post in posts" :key="post.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {{post.id}}
                </th>
                <td class="px-6 py-4">
                    {{post.date}}
                </td>
                <td class="px-6 py-4">
                    {{post.time}}
                </td>
                
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            
            
        </tbody>
    </table>
</div>
</div>

  <div class="flex items-center justify-center py-6">
    <UButton color="purple" variant="outline">Load More</UButton>
  </div>
</template>

