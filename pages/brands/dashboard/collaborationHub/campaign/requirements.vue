<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });
    import { ArrowLeft, Plus } from 'lucide-vue-next';
    import { format } from "date-fns";
    const collabHub = useCollabHubStore();
    import { Form, Field, ErrorMessage } from 'vee-validate';
    const { niche, audienceSize, gender} = storeToRefs(collabHub);
    import * as yup from "yup";


    const passwordRules = yup.string().required()
    const campaignRules = yup.string().required()
    
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

            <Form class="p-4  w-full flex flex-col gap-8">
                
                <span class="flex flex-col gap-4">
                  

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div  class="w-full">
                            <h2> Gender</h2>
                            <Select v-model="gender" >
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
                            {{gender}}
                        </div>

                      

                        <span class="">
                            <h2>Choose your ideal creator niche</h2>
                            <Select>
                                <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select a niche" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>North America</SelectLabel>
                                    <SelectItem value="est">
                                    Eastern Standard Time (EST)
                                    </SelectItem>
                                    <SelectItem value="cst">
                                    Central Standard Time (CST)
                                    </SelectItem>
                                    <SelectItem value="mst">
                                    Mountain Standard Time (MST)
                                    </SelectItem>
                                    <SelectItem value="pst">
                                    Pacific Standard Time (PST)
                                    </SelectItem>
                                    <SelectItem value="akst">
                                    Alaska Standard Time (AKST)
                                    </SelectItem>
                                    <SelectItem value="hst">
                                    Hawaii Standard Time (HST)
                                    </SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Europe & Africa</SelectLabel>
                                    <SelectItem value="gmt">
                                    Greenwich Mean Time (GMT)
                                    </SelectItem>
                                    <SelectItem value="cet">
                                    Central European Time (CET)
                                    </SelectItem>
                                    <SelectItem value="eet">
                                    Eastern European Time (EET)
                                    </SelectItem>
                                    <SelectItem value="west">
                                    Western European Summer Time (WEST)
                                    </SelectItem>
                                    <SelectItem value="cat">
                                    Central Africa Time (CAT)
                                    </SelectItem>
                                    <SelectItem value="eat">
                                    East Africa Time (EAT)
                                    </SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Asia</SelectLabel>
                                    <SelectItem value="msk">
                                    Moscow Time (MSK)
                                    </SelectItem>
                                    <SelectItem value="ist">
                                    India Standard Time (IST)
                                    </SelectItem>
                                    <SelectItem value="cst_china">
                                    China Standard Time (CST)
                                    </SelectItem>
                                    <SelectItem value="jst">
                                    Japan Standard Time (JST)
                                    </SelectItem>
                                    <SelectItem value="kst">
                                    Korea Standard Time (KST)
                                    </SelectItem>
                                    <SelectItem value="ist_indonesia">
                                    Indonesia Central Standard Time (WITA)
                                    </SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Australia & Pacific</SelectLabel>
                                    <SelectItem value="awst">
                                    Australian Western Standard Time (AWST)
                                    </SelectItem>
                                    <SelectItem value="acst">
                                    Australian Central Standard Time (ACST)
                                    </SelectItem>
                                    <SelectItem value="aest">
                                    Australian Eastern Standard Time (AEST)
                                    </SelectItem>
                                    <SelectItem value="nzst">
                                    New Zealand Standard Time (NZST)
                                    </SelectItem>
                                    <SelectItem value="fjt">
                                    Fiji Time (FJT)
                                    </SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>South America</SelectLabel>
                                    <SelectItem value="art">
                                    Argentina Time (ART)
                                    </SelectItem>
                                    <SelectItem value="bot">
                                    Bolivia Time (BOT)
                                    </SelectItem>
                                    <SelectItem value="brt">
                                    Brasilia Time (BRT)
                                    </SelectItem>
                                    <SelectItem value="clt">
                                    Chile Standard Time (CLT)
                                    </SelectItem>
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                        </span>

                        <span class="">
                            <h2>Choose your creator audience size</h2>
                            <div class="flex flex-col justify-end gap-2">
                                <Select  >
                                    <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Select audience size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>North America</SelectLabel>
                                        <SelectItem value="est">
                                        Eastern Standard Time (EST)
                                        </SelectItem>
                                        <SelectItem value="cst">
                                        Central Standard Time (CST)
                                        </SelectItem>
                                        <SelectItem value="mst">
                                        Mountain Standard Time (MST)
                                        </SelectItem>
                                        <SelectItem value="pst">
                                        Pacific Standard Time (PST)
                                        </SelectItem>
                                        <SelectItem value="akst">
                                        Alaska Standard Time (AKST)
                                        </SelectItem>
                                        <SelectItem value="hst">
                                        Hawaii Standard Time (HST)
                                        </SelectItem>
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                                
                            </div>
                        </span>

                    

                    </div>

                   
                </span>





            </Form>

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

