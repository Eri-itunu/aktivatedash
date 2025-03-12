<template>
    <div class="rounded-lg border-[0.5px] border-[#CDC2FF] p-4 flex flex-col justify-between">
        <div class="flex items-center justify-center ">
            <div class="flex justify-around h-9 w-9 rounded-full border-2 border-white overflow-hidden">
                <img class="object-contain" :src="`https://robohash.org/2`" alt="">
            </div>
            <p>Jane Doe</p>
        </div>

        <div>
            <div class="flex justify-between">
                <div>
                    <p>TOTAL AUDEINCE</p>
                    <p>100,000</p>
                </div>
                <div>
                    <p>TOTAL AUDEINCE</p>
                    <p>100,000</p>
                </div>
            </div>

            <div class="flex justify-between">
                <div>
                    <p>TOTAL AUDEINCE</p>
                    <p>100,000</p>
                </div>
                <div>
                    <p>TOTAL AUDEINCE</p>
                    <p>100,000</p>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-2">
            <!-- <img v-if="platform.work_platform?.includes('instagram')" class="object-contain" src="/icons/collab/instagram.svg" alt="">
            <img v-if="platform.work_platform?.includes('linkedin')" class="object-contain" src="/icons/collab/linkedin.svg" alt="">
            <img v-if="platform.work_platform?.includes('facebook')" class="object-contain" src="/icons/collab/facebook.svg" alt="">
            <img v-if="platform.work_platform?.includes('tiktok')" class="object-contain" src="/icons/collab/tiktok.svg" alt="">
            <img v-if="platform.work_platform?.includes('twitter')"  class="object-contain" src="/icons/collab/twitter.svg" alt="">
            <img v-if="platform.work_platform?.includes('whatsapp')"  class="object-contain" src="/icons/collab/whatsapp.svg" alt="">
            <img v-if="platform.work_platform?.includes('snapchat')"  class="object-contain" src="/icons/collab/snapchat.svg" alt="">
            <img v-if="platform.work_platform?.includes('youtube')" class="object-contain" src="/icons/collab/youtube.svg" alt=""> -->
        </div>

        <div>
            <button class="w-full text-white bg-purple1 rounded-md p-2">
                View
            </button>
        </div>
    </div>

</template>
