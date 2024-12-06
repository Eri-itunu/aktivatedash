<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });
    import { ArrowLeft, Plus } from 'lucide-vue-next';
    import { format } from "date-fns";
    const collabHub = useCollabHubStore();
    const Types = ref([
        { value: "any", label: "Any" },
        { value: "story", label: "story" },
        { value: "main post", label: "main post" },
    ]);
  


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
                        'cursor-pointer border rounded gap-1 p-6 flex-col flex text-black dark:text-white items-center justify-center',
                        collabHub.platform === 'instagram'
                            ? ' border-purple1 border-[1px] '
                            : 'border-b-[1px]  text-[#D9D9D9]',
                        ]"
                             >
                             <img src="/assets/icons/Insta.svg" class="h-6 w-6" alt="">
                            <p class="text-xs" >instagram</p>
                        </div>

                        <div
                         @click="collabHub.platform = 'tiktok'"
                        :class="[
                        'cursor-pointer border rounded gap-1 p-6 flex-col flex items-center text-black dark:text-white  justify-center',
                        collabHub.platform === 'tiktok'
                            ? ' border-purple1 border-[1px]'
                            : 'border-b-[1px]  text-[#D9D9D9]',
                        ]"
                             >
                             <img src="/assets/icons/tiktok.svg" class="h-6 w-6" alt="">
                             <p class="text-xs" > tiktok</p>
                            
                        </div>

                        <div
                         @click="collabHub.platform = 'facebook'"
                        :class="[
                        'cursor-pointer border rounded p-6 gap-1 flex flex-col items-center dark:text-white  text-black justify-center',
                        collabHub.platform === 'facebook'
                            ? ' border-purple1 border-[1px] '
                            : 'border-b-[1px]  text-[#D9D9D9]',
                        ]"
                             >
                             <img src="/assets/icons/facebook.svg" class="h-6 w-6" alt="">
                             <p class="text-xs" > facebook</p>
                        </div>
                    </div>

                    <div  class="w-full flex gap-3 flex-col md:flex-row">
                        <span class="w-1/2" >
                            <h2> Type</h2>
                            <Select v-model="collabHub.niche" >
                                <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select a niche" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Post type</SelectLabel>
                                    <SelectItem 
                                    v-for="type in Types" 
                                    :key="type.value" 
                                    :value="type.value"
                                    
                                    >
                                    {{ type.label }}
                                    </SelectItem>
                                </SelectGroup>
                                </SelectContent>
                            </Select> 
                        </span>

                        <span class="w-1/2" >
                            <p>Number of posts</p>
                            <input placeholder="2" v-model="collabHub.numOfPosts" type="number" class="bg-transparent border w-full p-2 rounded-lg" >
                        </span>
                       
                    </div>
                  
                    <span class=" w-full flex flex-col gap-1" >
                        <h2>What should the creator do?</h2>
                        <p class="opacity-[50%]">Give clear instructions on how you expect your content to look and feel like. The more detail the better!</p>
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
                            <p class="opacity-[50%]" >What creators should keep in mind</p>
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
                            <p class="opacity-[50%]">provide guidlines for creator captions </p>
                            <textarea
                                class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                                name=""
                                id=""
                                cols="30"
                                rows="5"
                                v-model="collabHub.captions"
                            ></textarea>
                        </span>
                        <span>
                            <h2>Hashtags</h2>
                            <p class="opacity-[50%]" >provide hashtags for creators to use on post</p>
                            <textarea
                                class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                                name=""
                                id=""
                                cols="30"
                                rows="5"
                                 v-model="collabHub.hashtags"
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

