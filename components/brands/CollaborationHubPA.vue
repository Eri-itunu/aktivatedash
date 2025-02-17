<script setup lang="ts" >
    type Results = {
        id: number,
        url: string,
        commentCount: number,
        likeCount: number,
        shareCount: number,
        viewCount: number
    }
    const newCampaign = ref<Results[]>([
        {   
            id:1,
            url: "instagram.com",
            commentCount: 4,
            likeCount: 5,
            shareCount: 5,
            viewCount: 5

        },
        {   
            id:2,
            url: "instagram.com",
            commentCount: 4,
            likeCount: 5,
            shareCount: 5,
            viewCount: 5

        },
        {   
            id:3,
            url: "instagram.com",
            commentCount: 4,
            likeCount: 5,
            shareCount: 5,
            viewCount: 5

        }
    ])
</script>
<template>

<div class="bg-white dark:bg-vDarkBlue" >
   <div v-if="newCampaign.length === 0"  class="text-center py-8">
       <p>No creators have uploaded content yet</p>
   </div>
   <div class="grid  md:grid-cols-4 grid-cols-2 gap-8 h-full bg-white dark:bg-vDarkBlue">
       <div v-for="sample in newCampaign" :key="sample.id" class=" bg-white dark:bg-[#090618] flex justify-between rounded-lg" >
           <Dialog>
               <DialogTrigger class="w-full cursor-pointer">
                   <div class="hover:grayscale-0 grayscale w-full">
                       <img src="/assets/icons/creatorContent.svg" alt="" class="w-full "  >
                       <div class="p-4" >
                           <h1>new_user</h1>
                           
                       </div>

                   </div>
               </DialogTrigger>
               <DialogContent class="bg-white dark:bg-[#090618] max-w-[300px] text-black dark:text-white border-none" >
               <DialogHeader>
                   <DialogTitle>Post Details</DialogTitle>
                   <div class="w-full flex justify-center py-4" >
                       <button class="rounded-[20px] text-white bg-black max-w-fit p-2" >view live post</button>
                   </div>
                   <div class="text-center flex flex-col gap-4" >
                       <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between" > <p>Comments :</p> <p> {{ sample.commentCount }}</p> </span>
                       <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Likes:</p> <p> {{sample.likeCount}}</p></span>
                       <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Shares:</p> <p> {{sample.shareCount}}</p></span>
                       <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Views:</p> <p> {{ sample.viewCount }}</p></span>
                    
                       
                   </div>
                   
               </DialogHeader>

          
               </DialogContent>
           </Dialog>
          
       </div>
       
   </div>
</div>
</template>