<script setup lang="ts">
    definePageMeta({
        layout: "light",
        middleware:"public"
    });
    import { ArrowLeft, Plus } from 'lucide-vue-next';
    import { format } from "date-fns";
    const {
        countryData,
        getCountryState,
        data: stateData,

        } = useProfile()
    const collabHub = useEditStore();
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
        { value: "0,0", label: "Any" , min:0, max:0 , price: 5000, name: "" },
        { label: "Nano Influencer (0 - 1K)", value:"0,1000", min: 0, max: 1000 ,  price: 10000, name: "Nano" },
        { label: "Micro Influencer (1K - 10K)",  value:"1000,10000", min: 1000, max: 10000, price:30000, name: "Micro" },
        { label: "Mid-tier Influencer (10K - 100K)",  value:"10000,100000", min: 10000, max: 100000,  price: 200000, name: "Mid-tier" },
        { label: "Macro Influencer (100K - 1M)",  value:"100000,1000000", min: 100000, max: 1000000,  price: 500000,name: "Macro" },
        { label: "Mega Influencer (1M+)",  value:"1000000,inf", min: 1000000, max: Infinity,  price: 3000000, name: "Mega" },
    ]);

    const genders = ref([
        {value:"Any", label:"Any"},
        {value:"M", label:"Male"},
        {value:"F", label:"Female"},
    ])

    const selectNiche = (value) => {
        collabHub.niche = value;
    };


    const setAudienceRange = (range) => {
        console.log(range)
        collabHub.audienceSizeMin = range.min;
        collabHub.audienceSizeMax = range.max;
        collabHub.influencerType = range.price
        collabHub.influencerName = range.name
    };
    watch(() => collabHub.audienceRange, (newVal) => {
        const selected = audienceRanges.value.find(r => r.value === newVal);
        if (selected) {
            collabHub.audienceSizeMin = selected.min;
            collabHub.audienceSizeMax = selected.max;
            collabHub.influencerType = selected.price;
        }
    });

   watch(
    () => collabHub.locations[0].countryCode,
    (newValue) => {
        if (newValue) {
        getCountryState({ countryCode: newValue })
        }
    },
    { immediate: true }
    )
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
                       

                        <span class="flex flex-col gap-2">
                                <label class="text-xs">Gender (Optional) </label>
                                <USelectMenu
                                    searchable
                                    v-model="collabHub.gender"
                                    :options="genders"
                                    placeholder="Select Gender "
                                    value-attribute="value"
                                    option-attribute="label"
                                />
                             
                        </span>

                      

                       

                        <span class="flex flex-col gap-2">
                                <label class="text-xs">Choose your ideal creator niche (Optional) </label>
                                <USelectMenu
                                    searchable
                                    v-model="collabHub.niche"
                                    :options="niches"
                                    placeholder="Select Niche "
                                    value-attribute="value"
                                    option-attribute="label"
                                />
                             
                        </span>

                        <span class="flex flex-col gap-2">
                                <label class="text-xs">Choose your creator audience size (Optional)</label>
                                <USelectMenu
                                    searchable
                                    v-model="collabHub.audienceRange"
                                    :options="audienceRanges"
                                    placeholder="Select Audience Size"
                                    value-attribute="value"
                                    option-attribute="label"
                                />
                             
                        </span>

                        <div class="flex flex-col gap-1">
                            <label class="text-xs">Country</label>
                            <USelectMenu
                                searchable
                                v-model="collabHub.locations[0].countryCode"
                                :options="countryData"
                                placeholder="Select Country"
                                value-attribute="code"
                                option-attribute="name"
                            />
                            </div>

                            <div class="flex flex-col gap-1">
                            <label class="text-xs">State</label>
                            <USelectMenu
                                searchable
                                v-model="collabHub.locations[0].state"
                                :options="stateData"
                                placeholder="Select State"
                                value-attribute="name"
                                option-attribute="name"
                            />
                            </div>
                    

                    </div>

                   
                </span>





            </form>

            <footer class="w-full flex justify-between border-t-[0.5px] border-t-[#464160] p-4" >
                <nuxt-link to="/brands/dashboard/collaborationHub/edit" class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
                    Back
                </nuxt-link>

                <nuxt-link to="deliverables" class="rounded-[28px]  px-6 py-2 bg-purple1 text-white" >
                    Next
                </nuxt-link>
            </footer>
        </div>
  
    </div>
</template>

