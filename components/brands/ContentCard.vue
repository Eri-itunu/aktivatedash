<script setup lang="ts">
    import type{ContentSubmissions, APIResponse} from "types"
    import { EllipsisVertical } from 'lucide-vue-next';
    import { useToast } from "../ui/toast/use-toast";
    const comment = ref<string>('')
    const { toast } = useToast();
    const userStore = useUserStore();
    const API_URL = useRuntimeConfig().public.API_URL;
    const accessToken = userStore.accessToken || "";
    const props = defineProps<{
        content: ContentSubmissions
    }>()
    const emit = defineEmits(['selected'])


    const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; 
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

    const openLink = (link: string | undefined) => {
        if(!link) {
            return
        }
        navigateTo(link, {
            open: {
            target: "_blank",
            windowFeatures: {
                width: 500,
                height: 500,
            },
            },
            external: true,
        }); 
    };

    const decide =  async(selection:string, id:string)=>{
        const body = {
            "submissionId" : id,
            "note" : comment.value,
            "decision" : selection
        }

        props.content.campaignDecision = selection
        try{
            const res = await $fetch<APIResponse<'submissions', ContentSubmissions>>(`${API_URL}/submission/brand/update-submission`, {
                method:"POST",
                //@ts-ignore
                body,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            comment.value = ""
            emit("selected")
       }catch(error:any){
            comment.value = ""
            toast({title: error.data.message || "Kindly provide feedback for the creator "})

       }
    }
</script>

<template>
     <div  class="w-full bg-white dark:bg-[#090618] rounded-lg p-8 relative " > 

      <div class="absolute right-4 top-4 border-non max-w-fit" >
        <DropdownMenu  >
          <DropdownMenuTrigger><EllipsisVertical /> </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="openLink(content.url)" >Visit link </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      

       
        <div class="flex items-center gap-4" >
          <div
            v-if="content.creator?.imgUrl === null ||content.creator?.imgUrl === undefined "
            class="border-4 rounded-full justify-center flex items-center bg-purplelabel w-12 h-12"
          >
            <p class=" text-black font-bold">
              {{ content.creatorProfile?.firstName?.charAt(0) }}
              {{ content.creatorProfile?.lastName?.charAt(0) }}

            </p>

          
          </div>
          <img
            v-else
            :src="content.creator?.imgUrl"
            class="border-[0.5px] border-purple1 rounded-full items-center p-0.5 w-12 h-12 object-fit"
            alt=""
          />
          <p>{{content.creatorProfile?.firstName}} {{ content.creatorProfile?.lastName }} </p>
        </div>
       
        <!-- <p v-if="content.campaignNote[0].note.length === 0">Notes from the creator</p> -->
         <p>Note from the creator:</p>
        <div v-for="item in content.creatorNote" >
            <p>{{item.note}}  </p>
        </div>

        <!-- <p>Link:</p>
        <button @click="openLink(content.url)" >{{content.url}}</button> -->

         <div v-if="content.campaignDecision === 'pending'" class="flex gap-4 items-center pt-8" >
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
                      <button class="text-black w-full border-[0.5px] border-black rounded-[100px] px-4 py-1" >
                          Cancel
                      </button>
                    </DialogClose>

                    <DialogClose class="basis-2/3" >
                        <button @click="decide('accept',content.id)" class="bg-purple1 text-white px-4 py-1 rounded-[100px] w-full " >
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
                      <button class="text-black w-full border-[0.5px] border-black rounded-[100px] px-4 py-1" >
                          Cancel
                      </button>
                    </DialogClose>

                    <DialogClose class="basis-2/3" >
                      <button @click="decide('reject',content.id)" class="rounded-[100px] w-full border-[0.5px] bg-[#EE273E] text-white px-8 py-2 text-sm">
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