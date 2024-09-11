<script setup lang="ts">
    import type{ContentSubmissions, APIResponse} from "types"
    const comment = ref<string>('')
    // const { toast } = useToast();
    const userStore = useUserStore();
    const API_URL = useRuntimeConfig().public.API_URL;
    const accessToken = userStore.accessToken || "";
    const props = defineProps<{
        content: ContentSubmissions
    }>()

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const decide =  async(selection:string, id:string)=>{
        const body = {
            "submissionId" : id,
            "note" : comment.value,
            "decision" : selection
        }


       try{
            const res = await $fetch<APIResponse<'submissions', ContentSubmissions>>(`${API_URL}/submission/brand/update-submission`, {
                method:"POST",
                headers: { Authorization: `Bearer ${accessToken}`},
                body
            });


       }catch(error:any){
            
            toast({title:"Kindly provide feedback for the creator "})

       }
    }
</script>

<template>
     <div  class="w-full bg-[#090618] rounded-lg p-8 " > 
  
        <div class="flex items-center gap-4" >
          <div
            v-if="content.creator?.imgUrl === null"
            class="border-4 rounded-full justify-center flex items-center bg-purplelabel w-12 h-12"
          >
            <p class=" text-black font-bold">
              {{ content.creator?.firstName?.charAt(0) }}
              {{ content.creator?.lastName?.charAt(0) }}

            </p>

          
          </div>
          <img
            v-else
            :src="content.creator?.imgUrl"
            class="border-[0.5px] border-purple1 rounded-full items-center p-0.5 w-12 h-12 object-fit"
            alt=""
          />
          <p>{{content.creator?.firstName}} {{ content.creator?.lastName }} </p>
        </div>
       
        <!-- <p v-if="content.campaignNote[0].note.length === 0">Notes from the creator</p> -->
         <p>Note:</p>
        <div v-for="content in content.campaignNote" >
            <p>{{content.note}}-- {{formatDate(content.timestamp)}} </p>
        </div>

        <div v-if="content.campaignDecision === 'pending'" class="flex gap-4 items-center pt-8" >
          <Dialog class="w-fit" >
            <DialogTrigger>
              <button class="rounded-[100px] border-[0.5px] border-[#CDC2FF] text-[#CDC2FF] px-6 text-sm" >
                Approve
              </button>
            </DialogTrigger>
            
            <DialogContent class="max-w-fit" >
              <div class="max-w-fit flex flex-col gap-2">
                <img src="/assets/icons/attention.svg" class="h-12" alt="">
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
                      <button class="text-purplelabel w-full border-[0.5px] border-purplelabel rounded-lg px-4 py-1" >
                          Cancel
                      </button>
                    </DialogClose>

                    <DialogClose class="basis-2/3" >
                        <button @click="decide('accept',content.id)" class="bg-purple1 text-white px-4 py-1 rounded-lg w-full " >
                            Approve
                        </button>
                    </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          

          <button class="rounded-[100px] border-[0.5px] border-[#EE273E] text-[#EE273E] px-6 text-sm">
            Reject
          </button>
        </div>
        <div >

        </div>
      </div>

</template>