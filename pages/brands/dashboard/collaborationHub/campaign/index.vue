<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });

    
    import { useToast } from "@/components/ui/toast/use-toast";
    const { toast } = useToast();
    import { ArrowLeft, Plus, X } from 'lucide-vue-next';
    import { format } from "date-fns";

    import axios from "axios";

    const date = new Date()

    const isValidURL = (url: string): boolean => {
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
        return urlRegex.test(url);
    };

    
    const createCollaboration = useCollabHubStore();
    const loading = ref(false);
    const userStore = useUserStore();
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;

    
    
    const onChangeFile = async(event: Event) => {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            createCollaboration.imageUrl = files[0];
            const formData = new FormData();
            formData.append("file", createCollaboration.imageUrl);
            formData.append("type", "file");
            await uploadFile(formData)
        }
    };

    const removeFile = () => {
        createCollaboration.imageUrl = null;
        createCollaboration.fileUrl = "";
    };

    const goToNext = async () => {
        if (createCollaboration.imageUrl) {
            const formData = new FormData();
            formData.append("file", createCollaboration.imageUrl);
            formData.append("type", "file");
            await uploadFile(formData);
        }
    };

    const uploadFile = async (formData: FormData) => {
        loading.value = true;

        try {
            const res = await axios.post(
            `${API_URL}/upload`,
            formData,
            {
                headers: {
                Authorization: `Bearer ${userStore.accessToken}`,
                "Content-Type": "multipart/form-data",
                }
            }
            );
            loading.value = false;
            createCollaboration.fileUrl = res.data.data.url;
            toast({ title: "Image uploaded successfully" });
        } catch (error) {
            loading.value = false;
            toast({ title: "Error uploading image" });
        } 
    };

    const getDifferenceInDays = (date1, date2) => {
    const msInDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    return Math.floor((new Date(date2).getTime() - new Date(date1).getTime()) / msInDay);
};

const { startDate, endDate, contentApproval, closeDate } = storeToRefs(createCollaboration);

// Define dates properly
const timelineCloseDate = createCollaboration.closeDate|| ref(new Date(new Date().setDate(new Date().getDate() + 2)));
const timelineContentApproval = createCollaboration.contentApproval || ref(new Date(new Date().setDate(new Date().getDate() + 9))); 
const timelineStartDate = createCollaboration.startDate || ref(new Date(new Date().setDate(new Date().getDate() + 16)));
const timelineEndDate = createCollaboration.endDate || ref(new Date(new Date().setDate(new Date().getDate() + 23)));


const todaysDate = new Date(); // Fixed today's date

const errors = ref<string[]>([]);

const validateFormAndNavigate = () => {
    // Reset errors
    errors.value = [];

    // Check required fields
    if (!createCollaboration.campaignName) {
        errors.value.push("Campaign name is required.");
    }
    if (!createCollaboration.fileUrl) {
        errors.value.push("Please upload a cover image.");
    }
    if (!createCollaboration.campaignDescription) {
        errors.value.push("Campaign description is required.");
    }
    if (!createCollaboration.numOfCreators || createCollaboration.numOfCreators < 1) {
        errors.value.push("Number of creators must be at least 1.");
    }
    if (!createCollaboration.companyName) {
        errors.value.push("Company name is required.");
    }
    if (!createCollaboration.companyLinks) {
        errors.value.push("A Website or social link is required.");
    }
    if (createCollaboration.companyLinks && !isValidURL(createCollaboration.companyLinks)) {
        errors.value.push("A valid website or social link is required.");
    }
    if (!createCollaboration.brandInformation) {
        errors.value.push("Brand information is required");
    }

    // Date validation
    if (createCollaboration.closeDate < todaysDate) {
        toast({ title: "Close date cannot be before today's date." });
        return;
    }
    if (createCollaboration.contentApproval < createCollaboration.closeDate || 
        getDifferenceInDays(createCollaboration.closeDate, createCollaboration.contentApproval) < 7) {
        toast({ title: "Content approval date must be at least 7 days after close date." });
        return;
    }
    if (createCollaboration.startDate < createCollaboration.contentApproval || 
        getDifferenceInDays(createCollaboration.contentApproval, createCollaboration.startDate) < 7) {
        toast({ title: "Start date must be at least 7 days after content approval date." });
        return;
    }
    if (createCollaboration.endDate < createCollaboration.startDate || 
        getDifferenceInDays(createCollaboration.startDate, createCollaboration.endDate) < 7) {
        toast({ title: "End date must be at least 7 days after start date." });
        return;
    }

    // Display errors or navigate
    if (errors.value.length > 0) {
        errors.value.forEach((error) => {
            toast({ title: error });
        });
        return;
    }

    // Assign dates correctly
    closeDate.value = createCollaboration.closeDate;
    contentApproval.value = createCollaboration.contentApproval;
    startDate.value = createCollaboration.startDate;
    endDate.value = createCollaboration.endDate;

    navigateTo('campaign/requirements'); // Replace with the actual route
};



</script>


<template>
    <div class=" text-black dark:text-white px-2 md:p-8 flex flex-col gap-8  bg-[#F5F5F5] dark:bg-dashbg " >
        <nuxt-link to="/brands/dashboard/collaborationHub" >
            <ArrowLeft />
        </nuxt-link> 

        <BrandsCHubStage :campaign="false" />

        <div class="rounded-[8px] bg-white dark:bg-[#090618]" >
            <header class="p-6 flex flex-col gap-4">
                <h1 class="text-3xl" >Campaign details</h1>
                <p class="opacity-[56%]" >This is what creators will see before they opt into the campaign</p>
                 
            </header>

            <form @submit.prevent="" class="px-6  pb-5 w-full flex flex-col gap-8">
                <div class=" w-full md:w-2/3 " >
                    <h2 class="font-semibold mb-2">What's the name of your campaign</h2>
                    <Field v-model="createCollaboration.campaignName" name="campaign" type="text"  placeholder="e.g. new product launch" 
                    class="w-full border rounded-[8px] p-2 bg-transparent"  />
                   
                   
                </div>

                <div>
                    <h2 class="text-black font-semibold mb-2 dark:text-white">Upload cover image</h2>
                    <p class="opacity-[56%] mb-1">Your cover image sets the tone and draws the right target creator</p>
                    <div class="flex gap-2">
                        <label for="upload">
                        <!-- Upload button shown when no file is uploaded -->
                            <div
                                v-if="!createCollaboration.imageUrl"
                                class="md:w-full border-[1px] flex flex-col gap-2 border-[#464160] cursor-pointer border-dashed justify-center items-center p-24 rounded-lg"
                            >
                                <Plus class="w-6 h-6" />
                               
                            </div>
                        </label>
                        <div
                            v-if="createCollaboration.imageUrl"
                            class="w-fit relative border-[1px] flex flex-col gap-2 border-[#464160] border-dashed justify-center items-center p-2 rounded-lg"
                        >
                            
                            <img class="h-[200px] w-[300px]" :src=createCollaboration.fileUrl alt="">
                          
                            <button @click="removeFile" class="text-black  absolute top-0 right-0 dark:text-white">
                                <X/>
                            </button>
                        </div>
                        <input
                            @change="onChangeFile"
                            type="file"
                            id="upload"
                            accept="image/*"
                            style="display: none"
                        />
                           
                            
                       
                       
                    </div>
                </div>

                <div class=" w-full" >
                    <h2 class="font-semibold mb-2" >Campaign description</h2>
                    <p class="mb-2 opacity-[56%]" >Be specific and detailed in what makes this campaign unique</p>
                    <textarea
                        v-model="createCollaboration.campaignDescription"
                        class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="e.g. this campaign is about..."
                    ></textarea>
                    
                </div>
               

                <div class="w-2/3" >
                    <p class="font-semibold mb-3">How many creators do you want to hire?</p>
                    <NumberField class="md:w-1/3" v-model="createCollaboration.numOfCreators"  id="age" :default-value="18" :min="1">
                        <Label for="age">Number of creators</Label>
                        <NumberFieldContent >
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                        </NumberFieldContent>
                    </NumberField>
                   
                </div>


                <div class="flex flex-col gap-4">
                    <h1 class="text-3xl">Campaign timeline</h1>
                   
                    {{createCollaboration.closeDate}}
                    <div class="grid grid-cols-1  md:grid-cols-2 gap-10" >
                        <div class="" >
                            <h2 class=" font-semibold mb-1 " >Application close date</h2>
                            <p class="opacity-[56%] text-sm mb-1" >Set the final date for accepting applications</p>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton
                                class="w-full p-3 border-2 "
                                icon="i-heroicons-calendar-days-20-solid"
                                :label="format(createCollaboration.closeDate, 'd MMM, yyy')"
                                />

                                <template #panel="{ close }">
                                <DatePicker v-model="createCollaboration.closeDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </div>
                        <div class=" " >
                            <h2 class=" font-semibold mb-1">Content approval</h2>
                            <p class="mb-1 opacity-[56%] text-sm">Set a 2 week buffer for potential reviews and edits</p>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton
                                class="w-full p-3 border-2 "
                                icon="i-heroicons-calendar-days-20-solid"
                                :label="format(createCollaboration.contentApproval, 'd MMM, yyy')"
                                />

                                <template #panel="{ close }">
                                <DatePicker v-model="createCollaboration.contentApproval" is-required @close="close" />
                                </template>
                            </UPopover>
                        </div>
                        <div class=" " >
                            <h2 class=" font-semibold mb-1">Campaign start date</h2>
                            <p class="mb-1 opacity-[56%] text-sm" >Set the launch date for your campaign, marking when influencer posts will go live.</p>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton
                                class="w-full p-3 border-2 "
                                icon="i-heroicons-calendar-days-20-solid"
                                :label="format(createCollaboration.startDate, 'd MMM, yyy')"
                                />

                                <template #panel="{ close }">
                                <DatePicker v-model="createCollaboration.startDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </div>
                        <div class=" " >
                            <h2 class=" font-semibold mb-1" >Campaign end date</h2>
                            <p class="mb-1 opacity-[56%] text-sm" >Set the campaign's final day to wrap up all influencer activity and track the results.</p>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton
                                class="w-full p-3 border-2 "
                                icon="i-heroicons-calendar-days-20-solid"
                                :label="format(createCollaboration.endDate, 'd MMM, yyy')"
                                />

                                <template #panel="{ close }">
                                <DatePicker v-model="createCollaboration.endDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-4">
                    <div>
                        <h1 class="text-3xl mb-1">Brand information</h1>
                        <p class="opacity-[56%]" >Add in details about your brand that are important for creators to know </p>
                    </div>

                    <div class="flex flex-col md:flex-row justify-between gap-6">
                        <div class="basis-1/2">
                            <h2  class="font-semibold mb-1" >Company name</h2>
                            <input  type="text" class="w-full border rounded-[8px] p-2 bg-transparent"
                            placeholder="Add company name"
                            v-model="createCollaboration.companyName"
                            >
                        </div>

                        <div class="basis-1/2">
                            <h2 class="font-semibold mb-1" >Website or Social link</h2>
                            <div class="flex flex-col justify-end gap-2">
                                <input v-model="createCollaboration.companyLinks" type="text" class="w-full border rounded-[8px] p-2 bg-transparent" 
                                placeholder="Add company website or social link" />
                                
                            </div>
                        </div>

                    </div>

                    <div class=" w-full " >
                        <h2  class="font-semibold mb-1" >Brand info</h2>
                        <p  class=" mb-2 opacity-[56%]" >be specific and detailed in describing what makes your brand unique</p>
                        <textarea
                            v-model="createCollaboration.brandInformation"
                            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                            placeholder="e.g. my company is the best at..."
                        ></textarea>
                    </div>
                </div>





            </form>


            <footer class="w-full flex justify-between border-t-[0.5px] border-t-[#464160] p-4" >
                <nuxt-link to="/" class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
                    Back
                </nuxt-link>

              
                <button  @click="validateFormAndNavigate" class="rounded-[28px]  px-6 py-2 bg-[#5331E8] text-white" >
                    Next
                </button >
            </footer>
        </div>
  
    </div>
</template>

