<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });


    import { useToast } from "@/components/ui/toast/use-toast";
    const { toast } = useToast();
    import { ArrowLeft, Plus } from 'lucide-vue-next';
    import { format } from "date-fns";
    import { QuillEditor } from '@vueup/vue-quill';
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import axios from "axios";

    const date = new Date()



    const createCollaboration = useCollabHubStore();
    const loading = ref(false);
    const userStore = useUserStore();
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;
    createCollaboration.closeDate = new Date(date.setDate(date.getDate() + 2))
    createCollaboration.contentApproval = new Date(date.setDate(date.getDate() + 7));
    createCollaboration.startDate = new Date(date.setDate(date.getDate() + 14));
    createCollaboration.endDate = new Date(date.setDate(date.getDate() + 21));
    

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

        createCollaboration.fileUrl = res.data.data.url;
        toast({ title: "File uploaded successfully" });
    } catch (error) {
        toast({ title: "Error uploading file" });
    } finally {
        loading.value = false;
    }
    };


    const validateFormAndNavigate = () => {
        //  if (createCollaboration.imageUrl) {
        //     const formData = new FormData();
        //     formData.append("file", createCollaboration.imageUrl);
        //     formData.append("type", "file");
        //     uploadFile(formData);
        // }
    const errors = ref<string[]>([]);

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
    if (!createCollaboration.closeDate) {
        errors.value.push("Application close date is required.");
    }
    if (!createCollaboration.contentApproval) {
        errors.value.push("Content approval date is required.");
    }
    if (!createCollaboration.startDate) {
        errors.value.push("Campaign start date is required.");
    }
    if (!createCollaboration.endDate) {
        errors.value.push("Campaign end date is required.");
    }
    if (!createCollaboration.companyName) {
        errors.value.push("Company name is required.");
    }
    if (!createCollaboration.companyLinks) {
        errors.value.push("Website or social link is required.");
    }

    // Display errors or navigate
    if (errors.value.length > 0) {
        errors.value.forEach((error) => {
        toast({title : error});
        });
    } else {
        // Proceed to the next page
        navigateTo('campaign/requirements') // Replace with the actual route
    }
    };

</script>

<template>
    <div class=" text-black dark:text-white p-8 flex flex-col gap-8 min-h-screen bg-[#F5F5F5] dark:bg-dashbg" >
        <nuxt-link to="/brands/dashboard/collaborationHub" >
            <ArrowLeft />
        </nuxt-link>

        <BrandsCHubStage :campaign="false" />

        <div class="rounded-[8px] bg-white dark:bg-[#090618]" >
            <header class="p-4">
                <h1 class="text-2xl" >Campaign details</h1>
                <p>This is what creators will see before they opt into the campaign</p>
            </header>

            <Form @submit.prevent="" class="p-4  w-full flex flex-col gap-8">
                <span class=" w-2/3" >
                    <h2>What's the name of your campaign</h2>
                    <Field v-model="createCollaboration.campaignName" name="campaign" type="text"  placeholder="e.g. new product launch" 
                    class="w-full border rounded-[8px] p-2 bg-transparent"  />
                   
                   
                </span>

                <div>
                    <p class="text-black dark:text-white">Upload cover image</p>
                    <div class="flex gap-2">
                        <label for="upload">
                        <!-- Upload button shown when no file is uploaded -->
                            <div
                                v-if="!createCollaboration.imageUrl"
                                class="md:w-1/2 border-[1px] flex flex-col gap-2 border-[#464160] cursor-pointer border-dashed justify-center items-center p-24 rounded-lg"
                            >
                                Upload File
                                {{createCollaboration.imageUrl  }}
                            </div>
                        </label>
                        <div
                            v-if="createCollaboration.imageUrl"
                            class="w-full border-[1px] flex flex-col gap-2 border-[#464160] border-dashed justify-center items-center p-24 rounded-lg"
                        >
                            
                            <img class="h-[200px] w-[300px]" :src=createCollaboration.fileUrl alt="">
                          
                            <button @click="removeFile" class="text-black dark:text-white">Remove File</button>
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

                <span class=" w-full" >
                    <h2>Campaign description</h2>
                    
                    <textarea
                        v-model="createCollaboration.campaignDescription"
                        class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                    ></textarea>
                    
                </span>
               

                <span class="w-1/3" >
                    <NumberField v-model="createCollaboration.numOfCreators"  id="age" :default-value="18" :min="1">
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
                                :label="format(createCollaboration.closeDate, 'd MMM, yyy')"
                                />

                                <template #panel="{ close }">
                                <DatePicker v-model="createCollaboration.closeDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </span>
                        <span class=" " >
                            <h2>Content approval</h2>
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
                        </span>
                        <span class=" " >
                            <h2>Campaign start date</h2>
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
                        </span>
                        <span class=" " >
                            <h2>Campaign end date</h2>
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
                            <input  type="text" class="w-full border rounded-[8px] p-2 bg-transparent"
                            v-model="createCollaboration.companyName"
                            >
                        </span>

                        <span class="basis-1/2">
                            <h2>Website or Social link</h2>
                            <div class="flex flex-col justify-end gap-2">
                                <input v-model="createCollaboration.companyLinks" type="text" class="w-full border rounded-[8px] p-2 bg-transparent"  >
                                
                            </div>
                        </span>

                    </div>

                    <span class=" w-full flex flex-col gap-1" >
                        <h2>Brand info(optional)</h2>
                        <p>be specific and detailed in describing what makes this campaign unique</p>
                        <textarea
                            v-model="createCollaboration.brandInformation"
                            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                        ></textarea>
                    </span>
                </span>





            </Form>


            <footer class="w-full flex justify-between border-t-[0.5px] border-t-[#464160] p-4" >
                <nuxt-link to="campaign" class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
                    Back
                </nuxt-link>

                <!-- Change back to a button that does a form check before proceeding -->
                <button  @click="validateFormAndNavigate" class="rounded-[28px]  px-6 py-2 bg-[#5331E8] text-white" >
                    Next
                </button >
            </footer>
        </div>
  
    </div>
</template>

