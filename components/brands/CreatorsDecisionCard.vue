<script setup lang="ts" >
import type { APIResponse, NPlatformProfile,ContentSubmissions } from "types";

import { getSingleCreator } from "@/api/brand/getCreator.brand";
import { useToast } from "../ui/toast/use-toast";

const { toast } = useToast();
const props = defineProps<{
  creatorId: string;
  requestId: string;
 
}>();
const API_URL = useRuntimeConfig().public.API_URL;
const userStore = useUserStore();
const profile = ref<NPlatformProfile>();
const loading = ref(false)
const comment = ref()
const accessToken = userStore.accessToken || "";

const getCreator = async () => {
  loading.value = true;

  const accessToken = userStore.accessToken || "";
  const influencerId = props.creatorId
  try {
    const res = await getSingleCreator({
      apiUrl: API_URL,
      influencerId,
      accessToken,
    });

    profile.value = res;
   
  } catch (error: any) {
    loading.value = false;
  }
};

const decide =  async(selection:string)=>{
        const body = {
            "requestId" : props.requestId,
            "note" : comment.value,
            "decision" : selection
        }


       try{
            const res = await $fetch<APIResponse<'submissions', ContentSubmissions>>(`${API_URL}/campaign/collaboration-hub/decide-on-request`, {
                method:"POST",
                headers: { Authorization: `Bearer ${accessToken}`},
                body
            });

            comment.value = ""
       }catch(error:any){
            comment.value = ""
            toast({title: error.data.message || "Kindly provide feedback for the creator "})

       }
    }

onMounted(async () => await getCreator());
</script>

<template>
     <div  class="w-full bg-white dark:bg-[#090618] rounded-lg p-8 " > 
  
      <div class="flex items-center gap-4" >
        <div
          v-if="profile?.imgUrl === null ||profile?.imgUrl === undefined "
          class="border-4 rounded-full justify-center flex items-center bg-purplelabel w-12 h-12"
        >
          <p class=" text-black font-bold">
            {{ profile?.firstName?.charAt(0) }}
            {{ profile?.lastName?.charAt(0) }}

          </p>

        
        </div>
        <img
          v-else
          :src="profile?.imgUrl"
          class="border-[0.5px] border-purple1 rounded-full items-center p-0.5 w-12 h-12 object-fit"
          alt=""
        />
        <p>{{profile?.firstName}} {{ profile?.lastName }} </p>
      </div>
    
      <div  class="flex gap-4 items-center pt-8" >
        <Dialog class="w-fit" >
          <DialogTrigger>
            <button class="rounded-[100px] border-[0.5px] border-[#CDC2FF] text-[#CDC2FF] px-8 py-2 text-sm" >
              Approve
            </button>
          </DialogTrigger>
          
          <DialogContent class="max-w-fit" >
            <div class="max-w-fit flex flex-col gap-2">
              <img src="/icons/attention.svg" class="h-12" alt="">
              <h1 class="text-center">Are you sure you want to approve this content</h1>
              <p class="text-center">Creators would be notified to post content uploaded</p>
              <div class="flex flex-col">
                  <p>Comment:</p>
                  <textarea
                      v-model="comment"
                      class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                      placeholder="E.g: Launching a new product in Lagos..."
                      cols="30"

                  ></textarea>
              </div>

              <div class="flex justify-center pt-4 gap-2">
                  
                  <DialogClose class="basis-1/3" >
                    <button class="dark:text-white text-black w-full border-[0.5px] dark:border-white border-black rounded-[100px] px-4 py-1" >
                        Cancel
                    </button>
                  </DialogClose>

                  <DialogClose class="basis-2/3" >
                      <button @click="decide('reject')" class="bg-purple1 text-white px-4 py-1 rounded-[100px] w-full " >
                          Approve
                      </button>
                  </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        

        <Dialog class="w-fit" >
          <DialogTrigger>
            <button  class="rounded-[100px] border-[0.5px] border-[#EE273E] text-[#EE273E] px-8 py-2 text-sm">
              Reject
            </button>
          </DialogTrigger>
          
          <DialogContent class="max-w-fit" >
            <div class="max-w-fit flex flex-col gap-1">
              <img src="/icons/attention.svg" class="h-12" alt="">
              <h1 class="text-center">Are you sure you want to approve this content</h1>
              <p class="text-center text-xs">Creators would be notified to post content uploaded</p>
              <div class="flex flex-col mt-2">
                  <p>Comment:</p>
                  <textarea
                      v-model="comment"
                      class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                      placeholder="E.g: Launching a new product in Lagos..."
                      cols="30"

                  ></textarea>
              </div>

              <div class="flex justify-center pt-4 gap-2">
                  
                  <DialogClose class="basis-1/3" >
                    <button class="dark:text-white text-black w-full border-[0.5px] dark:border-white border-black rounded-[100px] px-4 py-1" >
                        Cancel
                    </button>
                  </DialogClose>

                  <DialogClose class="basis-2/3" >
                    <button @click="decide('accept')" class="rounded-[100px] w-full border-[0.5px] bg-[#EE273E] text-white px-8 py-2 text-sm">
                      Reject
                    </button>
                  </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
      </div>
      <div >

      </div>
</div>

</template>