<script setup lang="ts">


import type { ContentSubmissions , PaginatedAPIResponse } from 'types';
definePageMeta({
  layout: 'brands',
  colorMode:'dark'
})
const isOpen = ref(false);
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const userStore = useUserStore();
const accessToken = userStore.accessToken || "";
const contents = ref<ContentSubmissions[]>([]);
const loading = ref(false)
const empty = ref(false)

const getList = async() => {
    loading.value = true
    const apiUrl = API_URL
    try {
      const res = await $fetch<PaginatedAPIResponse<'submissions', ContentSubmissions>>(`${apiUrl}/submission/brand/my-submissions`, {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      contents.value = res.data.submissions.data;
      loading.value=false

      if (contents.value.length === 0){
        empty.value=true
      }
    }
  
    catch (error: any) {
      throw new Error(error.data?.message || "Something went wrong")
    }
    

}

const approve =(id: string)=>{

}

watchEffect(async()=>{await getList()})
</script>

 
<template>
    
    <div class="flex items-center justify-center" v-if="empty">
        <div class="">
            No Submissions
        </div>
    </div>
    <div v-else class="px-2 md:px-8 flex flex-col  gap-4 mt-5">
        <p class="text-purplelabel">Content for approval</p>
        <div  class=" mt-8 relative overflow-x-auto shadow-md rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg">
                    <tr>
                        
                        <th scope="col" class="px-6 py-3">
                            Campaign Name
                        </th>
                        <th scope="col" class="max-md:hidden px-6 py-3">
                            Type
                        </th>
                       
                        <th scope="col" class="max-md:hidden px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
       
                    </tr>
                </thead>
                <tbody>
                <tr v-if="loading">
                    <td class="px-6 py-4">
                        <USkeleton class="h-4 w-[120px]" />
                    </td>
                    <td class="max-md:hidden px-6 py-4">
                        <USkeleton class="h-4 w-[120px]" />
                    </td>
                    <td class="max-md:hidden px-6 py-4">
                        <USkeleton class="h-4 w-[120px]" />
                    </td>
                    
                    <td class="px-6 py-4">
                        <USkeleton class="h-4 w-[120px]" />
                    </td>
                    
                </tr>
                <tr v-else v-for="content in contents" :key="content.id" class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue">
                    
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ content.campaign.headline }}
                    </th>
                    <td class="max-md:hidden px-6 py-4">
                       {{ content.type }}
                    </td>
                    
                    <td class="max-md:hidden px-6 py-4">
                    
                       <div v-if="content?.campaign_decision === 'reject'" class=" max-w-fit rounded-[100px] border-2 bg-red-300 text-red-500 px-2 border-red-500">
                            rejected
                        </div>

                        <div v-if="content?.campaign_decision === 'accept'" class="  max-w-fit rounded-[100px] border-2 bg-green-300 text-green-500 px-2 border-green-500">
                            accepted
                        </div>

                        <div v-if="content?.campaign_decision === 'pending'" class=" max-w-fit rounded-[100px] border-2 bg-yellow-300 text-yellow-500 px-2 border-yellow-500">
                            pending
                        </div>
                    </td>
                    <td class="px-6 py-4">
                       <button v-if="content.campaign_decision === 'pending'" @click="$router.push(`/brands/dashboard/content/${content.id}`)">
                            View more
                       </button>
                       <UButton
                            v-else
                            icon="i-heroicons-check"
                            size="2xs"
                            color="emerald"
                            variant="outline"
                            :ui="{ rounded: 'rounded-full' }"
                            square
                            :disabled="true"
                        />
                    </td>
                    
                    
                    
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>