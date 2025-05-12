<template>

    <div class="p-8">
        <div class="flex justify-between "  >
            <h1 class="font-semibold text-2xl">Voucher</h1>

            <nuxt-link to="voucher/fund" class="btn-custom" >
                + Create new voucher
            </nuxt-link>
          
        </div>
        <div class="h-full " >
            <!-- Tab switching section -->
            <section class="tab-section text-white flex w-full">
                <div
                v-for="tab in tabs"
                :key="tab.id"
                :class="[
                    ' basis-1/3 cursor-pointer text-center  p-4  flex max-w-fit text-sm',
                    tab.tabs === selectedTab
                    ? ' border-b-purple1 border-b-[2px] text-purple1'
                    : 'border-b-[1px] border-b-[#D9D9D9]/50  text-[#D9D9D9]',
                ]"
                @click="selectedTab = tab.tabs"
                >
                {{ tab.tabs }}
                </div>
                <div class="border-b-[#D9D9D9]/50 border-b-[1px] w-full"></div>
            </section>

            <div class="w-full h-full">
                <!--Brief section-->
                <div v-if="selectedTab === 'Assigned Vouchers' " class="py-4 ">
                    <div class="overflow-x-auto rounded-lg shadow-md sm:rounded-lg">
                        <table class="min-w-full table-auto border-collapse">
                        <thead class=" text-gray-700 uppercase bg-white  dark:bg-darkBlue dark:text-purplebg">
                            <tr class="b text-gray-700 uppercase bg-white  dark:bg-darkBlue dark:text-purplebg">
                            <th class="py-2 px-4 text-left text-sm  font-semibold">Description</th>
                            <th class="py-2 px-4 text-left text-sm  font-semibold">Initial Amount</th>
                            <th class="py-2 px-4 text-left text-sm  font-semibold">Balance</th>
                            <th class="py-2 px-4 text-left text-sm  font-semibold">Paid</th>
                            <th class="py-2 px-4 text-left text-sm  font-semibold">Expiry Date</th>
                            <th class="py-2 px-4 text-left text-sm  font-semibold"></th>
                            </tr>
                        </thead>
                        <tbody class="font-medium text-gray-900 text-wrap dark:text-white bg-white dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue">
                            <tr v-for="voucher in createdVouchers" :key="voucher._id" class="font-medium text-gray-900 text-wrap dark:text-white bg-white dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue border-t">
                            <td class="py-2 px-4 text-sm ">{{ voucher.description }}</td>
                            <td class="py-2 px-4 text-sm ">{{ voucher.initialAmount  }}</td>
                            <td class="py-2 px-4 text-sm ">{{ voucher.balance  }}</td>
                            <td class="py-2 px-4 text-sm ">{{ voucher.paymentVerified  }}</td>
                            <td class="py-2 px-4 text-sm ">{{ formatDate(voucher.expiryDate) }}</td>
                            <td class="py-2 px-4 text-sm text-blue-500 hover:underline cursor-pointer" @click="viewDetails(voucher.id, voucher.initialAmount)">
                                View Details
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div class="flex justify-center mt-2" >
                        <Pagination v-slot="{ page }" :total="myVouchersMeta?.total" :itemsPerPage="myVouchersMeta?.perPage"  :sibling-count="1" show-edges :default-page="myVouchersMeta?.currentPage">
                            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                            <PaginationFirst @click="toPage(1)" />
                            <PaginationPrev @click="previousPage" />

                            <template v-for="(item, index) in items">
                                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                                <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click="toPage(item.value)">
                                    {{ item.value }}
                                </Button>
                                </PaginationListItem>
                                <PaginationEllipsis v-else :key="item.type" :index="index" />
                            </template>

                            <PaginationNext @click="nextPage" />
                            <PaginationLast @click="toPage(myVouchersMeta?.lastPage ?? 0  )"/>
                            </PaginationList>
                        </Pagination>
                    </div>
                </div>

                <!--Applications Section-->
                <div v-if="selectedTab === 'Received Vouchers' " class=" h-full w-full py-4 ">
                   
                    <div class="overflow-x-auto rounded-lg shadow-md sm:rounded-lg">
                        <table class="min-w-full table-auto border-collapse">
                        <thead class=" text-gray-700 uppercase bg-white  dark:bg-darkBlue dark:text-purplebg">
                            <tr class="b text-gray-700 uppercase bg-white  dark:bg-darkBlue dark:text-purplebg">
                            <th class="py-2 px-4 text-left text-sm  font-semibold">Voucher Code</th>
                            <th class="py-2 px-4 text-left text-sm  font-semibold">Initial Amount</th>
                            <th class="py-2 px-4 text-left text-sm  font-semibold">Balance</th>
                            <th class="py-2 px-4 text-left text-sm  font-semibold">Expiry Date</th>
                           
                            </tr>
                        </thead>
                        <tbody class="font-medium text-gray-900 text-wrap dark:text-white bg-white dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue">
                            <tr v-for="voucher in myVouchers" :key="voucher._id" class="font-medium text-gray-900 text-wrap dark:text-white bg-white dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue border-t">
                            <td class="py-2 px-4 text-sm ">{{ voucher.code }}</td>
                            <td class="py-2 px-4 text-sm ">{{ voucher.initialAmount  }}</td>
                            <td class="py-2 px-4 text-sm ">{{ voucher.balance  }}</td>
                            <td class="py-2 px-4 text-sm ">{{ formatDate(voucher.expiryDate) }}</td>
                            
                            </tr>
                        </tbody>
                        </table>
                    </div>

                    <div class="flex justify-center mt-2" >
                        <Pagination v-slot="{ page }" :total="myVouchersMeta?.total" :itemsPerPage="myVouchersMeta?.perPage"  :sibling-count="1" show-edges :default-page="myVouchersMeta?.currentPage">
                            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                            <PaginationFirst @click="toPage(1)" />
                            <PaginationPrev @click="previousPage" />

                            <template v-for="(item, index) in items">
                                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                                <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click="toPage(item.value)">
                                    {{ item.value }}
                                </Button>
                                </PaginationListItem>
                                <PaginationEllipsis v-else :key="item.type" :index="index" />
                            </template>

                            <PaginationNext @click="nextPage" />
                            <PaginationLast @click="toPage(myVouchersMeta?.lastPage ?? 0  )"/>
                            </PaginationList>
                        </Pagination>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div v-if="createdVouchers.length === 0 && myVouchers.length === 0 && !loading" class="h-full flex flex-col justify-center items-center" >
        
        <div class="max-w-[500px] flex flex-col gap-1 items-center text-center text-pretty" >
            <Ticket class="h-32 w-32" />
            <h1 class="text-2xl font-semibold">Create your first voucher</h1>
            <p>Turn a lump sum into redeemable vouchers that SMEs can use to run campaigns for collaboration hub on Aktivate </p>
            <nuxt-link to="voucher/fund" class="flex gap-2 items-center py-2 bg-[#5D43CB] px-2 text-xs rounded-[8px] min-w-fit text-white"> <Plus/> Create voucher </nuxt-link>
        </div>
       
    </div>
</template>

<script setup lang="ts" >
import { Ticket, Plus} from "lucide-vue-next";
import { formatDate } from "@/utils";

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const userStore = useUserStore();
definePageMeta({
  layout: "light",
});

const selectedTab = ref("Assigned Vouchers");
const tabs = ref([
  { id: 1, tabs: "Assigned Vouchers" },
  { id: 2, tabs: "Received Vouchers" },
]);
const viewDetails =(id:String,amount:number)=>{
    navigateTo( `/brands/dashboard/voucher/distribute?id=${id}&amount=${amount}`)
}



    
    const { createdVouchers, myVouchers, loading, error, fetchVouchers,createdVouchersMeta,myVouchersMeta,toPage, nextPage, previousPage,page } = useVouchers();

onMounted(() => {
  fetchVouchers(userStore.accessToken as string, API_URL as string);
});

</script>