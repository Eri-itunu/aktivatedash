<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });
    import { ArrowLeft, Plus } from 'lucide-vue-next';
    import { format } from "date-fns";
    const collabHub = useCollabHubStore();
    const niches = ref([
        { value: "any", label: "Any" },
        { value: "beauty", label: "Beauty" },
        { value: "fitness", label: "Fitness" },
        { value: "tech", label: "Technology" },
        { value: "travel", label: "Travel" },
        { value: "fashion", label: "Fashion" },
        { value: "food", label: "Food" },
    ]);
    const audienceRanges = ref([
        { value: "0,0", label: "Any" },
        { label: "Nano Influencer (0 - 1K)", value:"0,100", min: 0, max: 1000 },
        { label: "Micro Influencer (1K - 10K)",  value:"1000,10000", min: 1000, max: 10000 },
        { label: "Mid-tier Influencer (10K - 100K)",  value:"10000,100000", min: 10000, max: 100000 },
        { label: "Macro Influencer (100K - 1M)",  value:"100000,1000000", min: 100000, max: 1000000 },
        { label: "Mega Influencer (1M+)",  value:"1000000,inf", min: 1000000, max: Infinity },
    ]);

    const selectNiche = (value) => {
        collabHub.niche = value;
    };


    const setAudienceRange = (range) => {
    collabHub.audienceSizeMin = range.min;
    collabHub.audienceSizeMax = range.max;
    };
    
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
                <p class="opacity-[56%]" >Add details about the kind of creator you need for your brand</p>
            </header>

            <form class="p-4  w-full flex flex-col gap-8">
                
                <span class="flex flex-col gap-4">
                  

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div  class="w-full flex flex-col gap-2">
                            <h2> Gender (Optional)</h2>
                      
                            <Select v-model="collabHub.gender" >
                                <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select a gender" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="Any">
                                        Any
                                    </SelectItem>
                                    <SelectItem value="M">
                                    Male
                                    </SelectItem>
                                    <SelectItem value="F">
                                    Female
                                    </SelectItem>
                                   
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                           
                        </div>

                      

                        <span class="flex flex-col gap-2">
                            <h2>Choose your ideal creator niche (Optional) </h2>
                            <Select v-model="collabHub.niche" >
                                <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select a niche" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Social Media Niches</SelectLabel>
                                    <SelectItem 
                                    v-for="niche in niches" 
                                    :key="niche.value" 
                                    :value="niche.value"
                                    @click="selectNiche(niche.value)"
                                    >
                                    {{ niche.label }}
                                    </SelectItem>
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                            
                        </span>

                        <span class="flex flex-col gap-2">
                            <h2>Choose your creator audience size (Optional)</h2>
                            <div class="flex flex-col justify-end gap-2">
                                <Select v-model="collabHub.audienceRange" >
                                    <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Select an audience range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Audience Size</SelectLabel>
                                        <SelectItem 
                                        v-for="range in audienceRanges" 
                                        :key="range.label" 
                                        :value="range.value"
                                        @click="setAudienceRange(range)"
                                        >
                                        {{ range.label }}
                                        </SelectItem>
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                               
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

