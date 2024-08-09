<script setup lang="ts">
    import { ArrowLeft, CircleAlert} from 'lucide-vue-next';
    definePageMeta({
        layout: "brands",
    });
    
    const condition = ref(true)
    const conditions = ref([
        {id:1, name: "Date", info:"Date is set automatically from the end date of the campaign"},
        {id:2, name: "Upload Content", info:"Creator must have uploaded content to be verified"},
        {id:3, name: "Connect a post and verify", info:"Creators must have uploaded the live link of the content from the feed"}
    ])
    const creators = ref([
        {id:1, name:"Helen", amount:10000, platofrm:"tiktok"},
        {id:2, name:"Helen", amount:10000, platofrm:"tiktok"},
        {id:3, name:"Helen", amount:10000, platofrm:"tiktok"},
        {id:4, name:"Helen", amount:10000, platofrm:"tiktok"},
        {id:5, name:"Helen", amount:10000, platofrm:"tiktok"},
        {id:6, name:"Helen", amount:10000, platofrm:"tiktok"},
        {id:7, name:"Helen", amount:10000, platofrm:"tiktok"},
        {id:8, name:"Helen", amount:10000, platofrm:"tiktok"},
    ])
    const selectedCondition = ref<string[]>([])
</script>

<template>
    <div class="text-white flex px-24  w-full h-full flex-col " >

        <!--Conditions page or modal-->
        <section v-if="condition" class="w-[90%] justify-center flex flex-col  gap-8 " >
            <header class="flex w-1/2 text-center justify-between items-center" >
                <button class="justify-start h-12 flex items-center" >
                    <ArrowLeft />
                </button>
                <h1 class="font-semibold text-2xl">Payment</h1>
            </header>


            <!-- Select milestones modal -->
            <div  class="bg-[#090618] rounded-lg flex flex-col gap-4 p-8 " >

                <header class="flex justify-between" >
                    <div>
                        <h2 class="font-semibold text-xl" >Set milestone payments (optional) </h2>
                        <h3 class="text-purplebg">Select anything creators must do in order to get paid</h3>
                    </div>

                    <div>
                        <Dialog>
                            <DialogTrigger as-child>
                                <Button class="rounded-full p0-0 text-sm border-2 bg-transparent border-purplebg" >
                                    <p class="p-0" >skip</p>
                                </Button>
                            </DialogTrigger>
                            <DialogContent class="sm:max-w-md bg-[#090618] border-none p-8 flex flex-col gap-8 text-white">
                            <DialogHeader>
                                <DialogTitle> Skip milestone payment</DialogTitle>
                                <DialogDescription>
                                    <p >When you skip milestone payment, all payment is automatically paid to creators at the set end date of the campaign.</p>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter  >
                                <div class="flex gap-2 w-full" >
                                    <DialogClose class="w-full" >
                                        <button class="w-full text-purplebg border-2 rounded-lg border-purplebg p-2" >
                                            Cancel
                                        </button>
                                    </DialogClose>
                                    <DialogClose class="w-full">
                                        <button @click="condition=false" class="w-full text-white bg-purple1 p-2 rounded-lg ">
                                            Next
                                        </button>
                                    </DialogClose>
                                </div>
                            </DialogFooter>
                            </DialogContent>
                        </Dialog>


                  
                        
                    </div>
                </header>

                <!-- Information banner -->

                <div class="w-full flex gap-2 rounded-lg bg-purplebg text-black p-4" >
                    <CircleAlert color="#5331e8" />
                    <div>
                        <p>If one condition is selected, payment is paid full 100%</p>
                        <p>If two conditions are selected, payment is paid in milestones of 50% and 50%</p>
                        <p>If three conditions are selected, payment is paid in milestones of 30%, 30% and 40% </p>
                    </div>
                </div>

                <!-- Conditions checkboxes  --->
                 <div class="flex flex-col w-full gap-2">
                    <h2>Conditions</h2>

                    <div 
                        v-for="condition in conditions" 
                        :key="condition.id"  
                        :class="[
                            'flex items-center gap-4  rounded-lg p-4 border-2 ' ,
                            selectedCondition.includes(condition.name) ? ' border-[#3c23aa]' : ' border-gray-600 '
                        ]"
                    >
                        <!-- <Checkbox v-model="selectedCondition" :value="condition.name" class="h-5 w-5 selected:bg-[#5331E8]" /> -->
                        <input type="checkbox" v-model="selectedCondition" :value="condition.name" 
                        class=" relative peer shrink-0 appearance-none w-5 h-5 border rounded-sm
                         border-white cursor-pointer bg-transparent  
                         checked:bg-[#5331E8]"

                         >
                        
                        <div>

                            <p class="font-semibold text-xl" >{{ condition.name }}</p>
                            <p class="text-purplebg text-sm">{{ condition.info }}</p>
                        </div>

                    </div>
                   
                
                 </div>

                 <!--Buttons-->

                 <div class="flex gap-2" >
                    <button class="basis-1/2 text-purplebg border-2 rounded-lg border-purplebg p-2" >
                        Cancel
                    </button>

                    <button class="basis-1/2 text-white bg-purple1 rounded-lg ">
                        Next
                    </button>
                 </div>
            </div>

            
        </section>

        <section  v-else class="w-full"  >
            <header class="flex w-1/2 text-center justify-between items-center" >
                <button class="justify-start h-12 flex items-center" >
                    <ArrowLeft />
                </button>
                <h1 class="font-semibold text-2xl">Payment</h1>
            </header>
            <!--Confirm creators modal-->
            <div  class="flex flex-col gap-4">

                <header class="flex justify-between items-center" >
                    <div>
                        <h2 class="font-semibold text-xl" >Confirm creators</h2>
                        <h3>Confirm creators with how much they are being paid</h3>
                    </div>

                    <div>
                        <button class="bg-purple1 rounded-lg text-white p-2" >
                            Disburse
                        </button>
                    </div>
                </header>

                <!--Information Breakdown-->
                <div class="rounded-lg border-[0.5px] border-gray-600 py-2 md:px-28 justify-between flex">
                    <div class="flex flex-col items-center">
                        <p class="text-purplebg" > 8</p>
                        <p class="text-sm"  >Creators</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="text-purplebg" > 8</p>
                        <p class="text-sm"  >Milestones</p>
                    </div>

                    <div class="flex flex-col items-center">
                        <p class="text-purplebg" > Nov 11,2024</p>
                        <p class="text-sm"  >Payment period</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="text-purplebg" > $5,000</p>
                        <p class="text-sm"  >Total amt to pay</p>
                    </div>
                </div>

                <!--Budget banner-->
                <div class="w-full flex gap-2 rounded-lg bg-purplebg text-black p-4" >
                    <CircleAlert color="#5331e8" />
                    <div>
                        <p class="text-sm">Your budget for this campaign will be disbursed as 50%, 50% based on the two milestone conditions you picked.</p>
                    </div>
                </div>


                <!--Creators table-->

                <div class=" ">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table
                            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                            <thead
                            class="text-xs  uppercase bg-darkBlue text-purplebg"
                            >
                            <tr>
                                <th scope="col" class="px-6 py-3">Creator</th>
                                <th scope="col" class="max-lg:hidden px-6 py-3">Platform</th>
                                <th scope="col" class="px-6 py-3">Amount to pay</th>
                                <th scope="col" class="px-6 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="creator in creators"
                                :key="creator.id"
                                class="text-white border-b bg-[#090618] border-gray-700 hover:bg-darkBlue"
                            >
                                <th
                                scope="row"
                                class="pl-6 py-4 font-medium text-wrap text-white"
                                >
                                <p class="max-w-[100px] break-words">
                                    {{ creator.name }}
                                </p>
                                </th>
                                <td>
                                    {{ creator.platofrm }}
                                </td>
                                <td>
                                    {{creator.amount}}
                                </td>
                                <td>
                                <button class="border-purplebg rounded-xl border-2 text-purplebg p-1" >
                                   <p class="text-sm" >Send payment</p>
                                </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!--Decision buttons-->
                <div class="flex gap-2" >
                    <button class="basis-1/2 text-purplebg border-2 rounded-lg border-purplebg p-2" >
                        Cancel
                    </button>

                    <button class="basis-1/2 text-white bg-purple1 rounded-lg ">
                        Next
                    </button>
                 </div>
            </div>
        </section>
    </div>
</template>