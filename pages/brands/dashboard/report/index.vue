<script setup lang="ts" >
    definePageMeta({
    layout: "brands",
    });
    const selectedTab = ref('Campaign Summary');
    const tabs = ref([
    { id: 1, tabs: 'Campaign Summary',  },
    { id: 2, tabs: 'Creators', },
    { id: 3, tabs: 'Content',  },
    ]);

    const samples = ref([
        { id:1},
        { id:2},
        { id:3},
        { id:4},
        { id:5},
        { id:6},
    ])

    import { Pin, FileSpreadsheet, CloudUpload, ChevronFirst, ChevronLeft, ChevronRight } from 'lucide-vue-next';
</script>

<template>

    <div class="px-4 flex flex-col gap-4 h-screen overflow-hidden text-white">

        <div class="flex justify-between">
            <h1>Perfect Campaign</h1>
            <div class="flex gap-4" >
                <button class="rounded-lg gap-1 border-2 flex items-center border-[#CDC2FF] text-[#CDC2FF] px-2 py-1 text-sm  " > <FileSpreadsheet color="#CDC2FF" class="h-4" /> Export PDF </button>
                <button class="rounded-lg gap-1 border-2 flex items-center border-[#CDC2FF] text-[#CDC2FF] px-2 py-1 text-sm " > <CloudUpload color="#CDC2FF" class="h-4" /> Export CSV</button>
            </div>
        </div>

        <!-- Tab switching section -->
        <section class="text-white flex w-full ">
            <div
                v-for="tab in tabs"
                :key="tab.id"
                :class="[
                ' basis-1/3 cursor-pointer py-4 pr-4 pl-1 flex max-w-fit text-sm' ,
                tab.tabs === selectedTab ? ' border-b-purple1 border-b-[2px] text-purple1' : 'border-b-[1px] border-b-grey1 '
                ]"
                @click="selectedTab = tab.tabs"
            >
                {{ tab.tabs }}

            </div>
            <div class="  border-b-grey1 border-b-[1px] w-full" >

            </div>
        </section>

        
        <!-- Key results section -->
        <div v-if="selectedTab === 'Campaign Summary'"  class="flex flex-col h-full gap-4">
            <BrandsReportSummary/>
        </div>

        <!-- Creators overview section -->
        <div v-if="selectedTab === 'Creators'" >
            <div class="mx-4 mt-10">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    <thead
                    class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg"
                    >
                    <tr>
                        <th scope="col" class="px-6 py-3 text-[#CDC2FF]">Creators</th>

                        <th scope="col" class="max-lg:hidden px-6 py-3 text-[#CDC2FF]">Followers</th>
                        <th scope="col" class="max-lg:hidden px-6 py-3 text-[#CDC2FF]">Engagement</th>
                        <th scope="col" class="max-lg:hidden px-6 py-3 text-[#CDC2FF]">Platform</th>
                        
                    </tr>
                    </thead>
                    <tbody>

                    <tr
                        v-for="campaign in campaigns"
                        :key="campaign.id"
                        class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue"
                    >
                        <th
                        scope="row"
                        class="pl-6 py-4 font-medium text-gray-900 text-wrap dark:text-white"
                        >
                        <p class="max-w-[100px] break-words">
                            {{ campaign.headline }}
                        </p>
                        </th>

                        <td class="max-lg:hidden pl-6 py-4">
                        {{ campaign.cost?.toLocaleString() }}
                        </td>
                        <td class="pl-6 max-lg:hidden py-4">
                        {{ campaign.budget?.toLocaleString() }}
                        </td>
                        <td class=" max-lg:hidden pl-6 py-4">
                        <UBadge
                            size="xs"
                            :label="campaign.is_paid ? 'Paid' : 'Not Paid'"
                            :color="campaign.is_paid ? 'emerald' : 'orange'"
                            variant="subtle"
                        />
                        </td>
                        <td class="pl-6 py-4">
                        <UButton
                            v-if="campaign.is_paid"
                            icon="i-heroicons-check"
                            size="2xs"
                            color="emerald"
                            variant="outline"
                            :ui="{ rounded: 'rounded-full' }"
                            square
                            :disabled="true"
                        />

                        <UButton
                            v-else
                            icon="i-heroicons-arrow-path"
                            size="2xs"
                            color="orange"
                            variant="outline"
                            :ui="{ rounded: 'rounded-full' }"
                            square
                            @click="handlePayment(campaign.id)"
                        >
                            Pay Now
                        </UButton>
                        </td>
                        <td class="pl-6 py-4">
                        <UButton
                            v-if="campaign.is_published"
                            icon="i-heroicons-check"
                            size="2xs"
                            color="emerald"
                            variant="outline"
                            :ui="{ rounded: 'rounded-full' }"
                            square
                            :disabled="true"
                        />

                        <UButton
                            v-else
                            icon="i-heroicons-arrow-path"
                            size="2xs"
                            color="orange"
                            variant="outline"
                            :ui="{ rounded: 'rounded-full' }"
                            square
                            @click="publishCampaign(campaign.id)"
                        >
                            Publish Campaign
                        </UButton>
                        </td>

                        <td>
                        <button @click="$router.push(`/brands/dashboard/campaigns/${campaign.id}`)">
                            View Details
                        </button>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg">
                        <tr  >
                            
                            <th colspan="4" class="max-lg:hidden px-6 py-3  text-[#CDC2FF]">
                                <div class="flex justify-center">
                                    <button>
                                        <ChevronLeft/>
                                    </button>
                                    <button>
                                        1
                                    </button>
                                    <button>
                                        <ChevronRight/>
                                    </button>

                                </div>
                            </th>
                           
                        </tr>
                    </tfoot>
                </table>
                </div>
            </div>
        </div>

        <!-- Content overview section -->
        <div v-if="selectedTab === 'Content'">
            <div class="grid md:grid-cols-4 grid-cols-2 gap-2">
                <div v-for="sample in samples" :key="sample.id" class="bg-[#090618] flex justify-between rounded-lg p-4" >
                    <div>
                        <h1>Perfect Gem Campaign</h1>
                        <p>Unknown creator</p>
                    </div>
                    <p>tiktok</p>
                </div>
                
            </div>
        </div>
    </div>
 
</template>