<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });
    import { ArrowLeft, Plus } from 'lucide-vue-next';
    import { format } from "date-fns";
    const createBrandCampaignStore = useCreateBrandCampaignStore();
    const { startDate, endDate, submissionDueDate } = storeToRefs(createBrandCampaignStore);

</script>

<template>
    <div class=" text-black dark:text-white p-8  flex flex-col gap-8 min-h-screen bg-[#F5F5F5] dark:bg-dashbg " >
        <nuxt-link to="/brands/dashboard/collaborationHub/campaign" >
            <ArrowLeft />
        </nuxt-link>

        <BrandsCHubStage :campaign=true />

        <div class="rounded-[8px] bg-white dark:bg-[#090618] " >
            <header class="p-4">
                <h1 class="text-2xl" >Target creator</h1>
                <p>Add details about the kind of creator you need for your brand</p>
            </header>

            <form class="p-4  w-full flex flex-col gap-8">
                

                

                <span class="flex flex-col gap-4">
                  

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <span class="">
                            <h2> Gender</h2>
                            <input type="text" class="w-full border rounded-[8px] p-2 bg-transparent" >
                        </span>

                        <span class="">
                            <h2>Age (optional)</h2>
                            <div class="flex flex-col justify-end gap-2">
                                <input type="text" class="w-full border rounded-[8px] p-2 bg-transparent"  >
                                
                            </div>
                        </span>

                        <span class="">
                            <h2>Choose your ideal creator niche</h2>
                            <input type="text" class="w-full border rounded-[8px] p-2 bg-transparent" >
                        </span>

                        <span class="">
                            <h2>Choose your creator audience size</h2>
                            <div class="flex flex-col justify-end gap-2">
                                <input type="text" class="w-full border rounded-[8px] p-2 bg-transparent"  >
                                
                            </div>
                        </span>

                        <span class="">
                            <h2>Location</h2>
                            <div class="flex flex-col justify-end gap-2">
                                <input type="text" class="w-full border rounded-[8px] p-2 bg-transparent"  >
                                
                            </div>
                        </span>

                    </div>

                   
                </span>





            </form>

            <footer class="w-full flex justify-between border-t-[0.5px] border-t-[#464160] p-4" >
                <nuxt-link to="/brands/dashboard/collaborationHub/campaign" class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
                    Back
                </nuxt-link>

                <nuxt-link to="deliverables" class="rounded-[28px]  px-6 py-2 bg-purple1 text-white" >
                    Next
                </nuxt-link>
            </footer>
        </div>
  
    </div>
</template>

