<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });
    import { ArrowLeft, Gift, CircleDollarSign, Plus } from 'lucide-vue-next';
    import { format } from "date-fns";
    const createBrandCampaignStore = useCreateBrandCampaignStore();
    const { startDate, endDate, submissionDueDate } = storeToRefs(createBrandCampaignStore);

</script>

<template>
    <div class=" text-black dark:text-white p-8 flex flex-col gap-8 min-h-screen bg-[#F5F5F5] dark:bg-dashbg " >
        <nuxt-link to="/brands/dashboard/collaborationHub/campaign" >
            <ArrowLeft />
        </nuxt-link>

        <BrandsCHubStage :campaign="true" :requirements="true" :deliverables="true" />

        <div class="rounded-[8px] bg-white dark:bg-[#090618] " >
            <header class="p-4">
                <h1 class="text-2xl" >Compensation</h1>
                <p class="text-[#000000] dark:text-white" >What are you offering creators </p>
            </header>

            <form class="p-4  w-full flex flex-col gap-8">
                <div class="flex gap-4 items-start border-b py-4">
                    
                    <div class="rounded-full bg-[#E9E6F3] max-w-fit p-2">
                        <CircleDollarSign class="w-5 h-5" color="#000000" />
                    </div>
                    <Checkbox id="terms" class="h-5 w-5 mt-2" />
                    <div class="flex flex-col justify-end ">
                        <h2 class="font-bold">I will pay the creator</h2>
                        <p>you collaborate with a creator on a paid campaign</p>

                        <div class="mt-1">
                            <p>Amount</p>
                            <input class="bg-transparent border rounded-lg p-2" type="text" placeholder="e.g. $800 per creator" />
                        </div>
                    </div>

                   
                </div>

                <div class="flex gap-4 items-start  border-b py-4">
                    
                    <div class="rounded-full bg-[#E9E6F3] max-w-fit p-2">
                        <Gift class="w-5 h-5" color="#000000" />
                    </div>
                    <Checkbox id="terms" class="h-5 w-5 mt-2" />
                    <div class="flex flex-col justify-end">
                        <h2 class="font-bold" >I will gift the creator a product or service</h2>
                        <p>you collaborate with creators in exchange for your product or service</p>
                    </div>
                </div>

                <div class="flex gap-2 items-start py-4">
                    <div class="flex items-center gap-1">
                        <div class="rounded-full bg-[#E9E6F3] max-w-fit p-2" >
                            <Gift class="w-5 h-5" color="#000000" />
                        </div>
                        <Plus />
                        <div class="rounded-full bg-[#E9E6F3] max-w-fit p-2">
                            <CircleDollarSign class="w-5 h-5" color="#000000" />
                        </div>
                    </div>
                    <Checkbox id="terms" class="h-5 w-5 mt-2" />
                    <div class="flex flex-col justify-end">
                        <h2 class="font-bold">I'm offering a paid campaign and a gift</h2>
                        <p>you pay the creator a fee and also gift your products or services</p>
                    </div>
                </div>
            </form>

            <footer class="w-full flex justify-between border-t-[0.5px] border-t-[#464160] p-4" >
                <button class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
                    Back
                </button>

                <nuxt-link to="campaign/compensation" class="rounded-[28px]  px-6 py-2 bg-purple1 text-white" >
                    Create campaign
                </nuxt-link>
            </footer>
        </div>
  
    </div>
</template>

