<script setup>

definePageMeta({
  layout: 'dashboard',
  colorMode:'dark'
})
const isOpen = ref(false);
</script>

 
<template>
    
    <div class="px-2 md:px-8 flex flex-col gap-4 mt-5">
        <div class="flex justify-start">
            <button @click="isOpen = true" class="rounded-xl px-4 py-1 text-black bg-[#CDC2FF]">
                New Content
            </button>
        </div>
        <Popup title = "Content Upload" v-if="isOpen" :togglePopup="()=> isOpen = false">
            <div class="flex flex-col gap-5">
                <div>
                    <p class=" mb-1">Link</p>
                    <input 
                        type="text"
                        class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
                    >
                </div>
              

                <div>
                    <p class=" mb-1">Type</p>
                    <input 
                        type="text"
                        class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
                    >
                </div>

                <div>
                    <p class=" mb-1">Select Campaign</p>
                    <input 
                        type="text"
                        class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
                    >
                </div>
                <div>
                    <p class=" mb-1">Comment</p>
                    <textarea
      
                        class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                        
                        cols="30"

                    ></textarea>
                </div>
                <div>
                    <button class="w-full bg-black text-white py-2">
                        Save
                    </button>
                </div>
            </div>
        </Popup>

        <div  class="relative overflow-x-auto shadow-md rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg">
                    <tr>
                        
                        <th scope="col" class="px-6 py-3">
                            Campaign Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Due Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
       
                    </tr>
                </thead>
                <tbody>
                <tr v-if="loading">
                    <td class="px-6 py-4">
                        <USkeleton class="h-4 w-[120px]" />
                    </td>
                    <td class="px-6 py-4">
                        <USkeleton class="h-4 w-[120px]" />
                    </td>
                    <td class="px-6 py-4">
                        <USkeleton class="h-4 w-[120px]" />
                    </td>
                    
                </tr>
                    <tr  class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue">
                        
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        
                        </th>
                        <td class="px-6 py-4">
                           
                        </td>
                        <td class="px-6 py-4">
                           
                        </td>
                        
                        
                    </tr>
                    
                    
                </tbody>
            </table>
        </div>
    </div>
</template>