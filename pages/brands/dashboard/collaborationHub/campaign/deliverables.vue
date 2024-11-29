<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });
    import { ArrowLeft, Plus } from 'lucide-vue-next';
    import { format } from "date-fns";
    const collabHub = useCollabHubStore();
    const { platform, type, quantity } = storeToRefs(collabHub);
  


</script>

<template>
    <div class=" text-black dark:text-white p-8 flex flex-col gap-8 min-h-screen bg-[#F5F5F5] dark:bg-dashbg " >
        <nuxt-link to="/brands/dashboard/collaborationHub/campaign" >
            <ArrowLeft />
        </nuxt-link>

        <BrandsCHubStage :campaign="true"  :requirements="true" />

        <div class="rounded-[8px] bg-white dark:bg-[#090618] " >
            <header class="p-4">
                <h1 class="text-2xl" >Deliverables</h1>
                <p>Describe the content you want created. This allows the creator to understand the scope of your work  </p>
            </header>

            <form class="px-4  w-full flex flex-col gap-8">
   
                <span class="flex flex-col gap-4">
                    
                    <div class="flex gap-2"  >
                        <div
                        @click="collabHub.platform = 'instagram'"
                        :class="[
                        'cursor-pointer border rounded p-6 flex items-center justify-center',
                        collabHub.platform === 'instagram'
                            ? ' border-purple1 border-[1px] text-purple1'
                            : 'border-b-[1px]  text-[#D9D9D9]',
                        ]"
                             >
                            instagram
                        </div>

                        <div
                         @click="collabHub.platform = 'tiktok'"
                        :class="[
                        'cursor-pointer border rounded p-6 flex items-center justify-center',
                        collabHub.platform === 'tiktok'
                            ? ' border-purple1 border-[1px] text-purple1'
                            : 'border-b-[1px]  text-[#D9D9D9]',
                        ]"
                             >
                            tiktok
                        </div>

                        <div
                         @click="collabHub.platform = 'facebook'"
                        :class="[
                        'cursor-pointer border rounded p-6 flex items-center justify-center',
                        collabHub.platform === 'facebook'
                            ? ' border-purple1 border-[1px] text-purple1'
                            : 'border-b-[1px]  text-[#D9D9D9]',
                        ]"
                             >
                            facebook
                        </div>
                    </div>

                    <div  class="w-full flex gap-3 flex-col md:flex-row">
                        <span>
                            <h2> Type</h2>
                            <Select v-model="type" >
                                <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select a gender" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="male">
                                    Male
                                    </SelectItem>
                                    <SelectItem value="female">
                                    Female
                                    </SelectItem>
                                
                                </SelectGroup>
                                </SelectContent>
                            </Select> 
                        </span>

                        <span>
                            <p>Number of posts</p>
                            <input type="text">
                        </span>
                       
                    </div>
                  
                    <span class=" w-full flex flex-col gap-1" >
                        <h2>What should the creator do?</h2>
                        <p>Give clear instructions on how you expect your content to look and feel like. The more detail the better!</p>
                        <textarea
                            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                        ></textarea>
                    </span>

                    <div class=" " >
                        <div>
                            <h2>What should creators avoid?</h2>
                            <p>What creators should keep in mind</p>
                            <textarea
                                class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                                name=""
                                id=""
                                cols="30"
                                rows="5"
                            ></textarea>
                        </div>
                    </div>

                    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8" >
                        <span>
                            <h2>Captions</h2>
                            <p>provide guidlines for what the creator captions should say</p>
                            <textarea
                                class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                                name=""
                                id=""
                                cols="30"
                                rows="5"
                            ></textarea>
                        </span>
                        <span>
                            <h2>Hashtags</h2>
                            <p class="mb-6" >provide hashtags for creators to use on post</p>
                            <textarea
                                class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                                name=""
                                id=""
                                cols="30"
                                rows="5"
                            ></textarea>
                        </span>
                    </div>
                </span>





            </form>

            <footer class="w-full flex justify-between border-t-[0.5px] border-t-[#464160] p-4" >
                <button class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
                    Back
                </button>

                <nuxt-link to="compensation" class="rounded-[28px]  px-6 py-2 bg-purple1 text-white" >
                    Next
                </nuxt-link>
            </footer>
        </div>
  
    </div>
</template>

