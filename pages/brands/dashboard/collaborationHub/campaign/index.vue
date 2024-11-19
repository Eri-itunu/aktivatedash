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
    <div class=" text-black dark:text-white p-8 flex flex-col gap-8 min-h-screen bg-[#F5F5F5] dark:bg-dashbg" >
        <nuxt-link to="/brands/dashboard/collaborationHub" >
            <ArrowLeft />
        </nuxt-link>

        <BrandsCHubStage :campaign="true" />

        <div class="rounded-[8px] bg-white dark:bg-[#090618]" >
            <header class="p-4">
                <h1 class="text-2xl" >Campaign details</h1>
                <p>This is what creators will see before they opt into the campaign</p>
            </header>

            <form @submit.prevent="                                                                                                                                                           " class="p-4  w-full flex flex-col gap-8">
                <span class=" w-2/3" >
                    <h2>What's the name of your campaign</h2>
                    <input type="text" placeholder="e.g. new product launch" class="w-full border rounded-[8px] p-2 bg-transparent" >
                </span>

                <span class="flex flex-col gap-3">
                    <h1>Upload cover image</h1>
                    <div
                        class="w-1/2 border-[1px] flex flex-col gap-2 border-[#464160] border-dashed justify-center items-center p-24 rounded-lg"
                        type="file"

                        accept=".doc, .docx, .pdf"

                    >
                        <Plus/>
                    </div>
                </span>

                <span class=" w-full" >
                    <h2>Campaign description</h2>
                    <textarea
                        class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                    ></textarea>
                </span>

                <span class="w-1/3" >
                    <NumberField  id="age" :default-value="18" :min="0">
                        <Label for="age">Number of creators</Label>
                        <NumberFieldContent >
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                        </NumberFieldContent>
                    </NumberField>
                </span>


                <span class="flex flex-col gap-4">
                    <h1 class="text-2xl">Publishing timeline</h1>
                    <div class="grid grid-cols-1  md:grid-cols-2 gap-10" >
                        <span class=" " >
                            <h2>Application close date</h2>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton
                                class="w-full p-3 border-2 "
                                icon="i-heroicons-calendar-days-20-solid"
                                :label="format(startDate, 'd MMM, yyy')"
                                />

                                <template #panel="{ close }">
                                <DatePicker v-model="startDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </span>
                        <span class=" " >
                            <h2>Content approval</h2>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton
                                class="w-full p-3 border-2 "
                                icon="i-heroicons-calendar-days-20-solid"
                                :label="format(startDate, 'd MMM, yyy')"
                                />

                                <template #panel="{ close }">
                                <DatePicker v-model="startDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </span>
                        <span class=" " >
                            <h2>Campaign start date</h2>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton
                                class="w-full p-3 border-2 "
                                icon="i-heroicons-calendar-days-20-solid"
                                :label="format(startDate, 'd MMM, yyy')"
                                />

                                <template #panel="{ close }">
                                <DatePicker v-model="startDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </span>
                        <span class=" " >
                            <h2>Campaign end date</h2>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton
                                class="w-full p-3 border-2 "
                                icon="i-heroicons-calendar-days-20-solid"
                                :label="format(startDate, 'd MMM, yyy')"
                                />

                                <template #panel="{ close }">
                                <DatePicker v-model="startDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </span>
                    </div>
                </span>

                <span class="flex flex-col gap-4">
                    <div>
                        <h1 class="text-2xl">Brand information</h1>
                        <p>Add in details about your brand that are important for creators to know </p>
                    </div>

                    <div class="flex flex-col md:flex-row justify-between gap-6">
                        <span class="basis-1/2">
                            <h2>Company name</h2>
                            <input type="text" class="w-full border rounded-[8px] p-2 bg-transparent" >
                        </span>

                        <span class="basis-1/2">
                            <h2>Website or Social link</h2>
                            <div class="flex flex-col justify-end gap-2">
                                <input type="text" class="w-full border rounded-[8px] p-2 bg-transparent"  >
                                <button class="text-xs min-w-fit">Add link</button>
                            </div>
                        </span>

                    </div>

                    <span class=" w-full flex flex-col gap-1" >
                        <h2>Brand info(optional)</h2>
                        <p>be specific and detailed in describing what makes this campaign uniques</p>
                        <textarea
                            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                        ></textarea>
                    </span>
                </span>





            </form>

            <footer class="w-full flex justify-between border-t-[0.5px] border-t-[#464160] p-4" >
                <button class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
                    Back
                </button>

                <!-- Change back to a button that does a form check before proceeding -->
                <nuxt-link  to="campaign/requirements" class="rounded-[28px]  px-6 py-2 bg-[#5331E8] text-white" >
                    Next
                </nuxt-link >
            </footer>
        </div>
  
    </div>
</template>

