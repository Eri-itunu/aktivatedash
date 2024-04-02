<template>
  <div class="w-[448px] min-w-[420px] min-h-fit  border border-grey1 rounded-lg bg-vDarkBlue text-white pb-2">
    <!--  Section A-->
    <div class="px-3  border-b border-b-darkBlue">
      <div class="flex justify-between py-3">
        <div class="flex gap-3">
          <p> i </p>
          <p> Purple Chilli</p>
        </div>
        <p class="underline text-grey1 text-xs"> upload comment</p>
      </div>
      <!-- image part -->
      <div class="border border-white rounded-lg h-[10rem]">
        some image jere
      </div>
      <!-- end image part -->
      <p class="uppercase text-xs font-thin text-grey2 my-2"> Campaign Plan</p>
      <p class=" line-clamp-2 text-ellipsis mb-2">Website Traffic: We are opening a new store in Lagos and we need to
        the
        young audience involved.</p>
    </div>
    <!-- end Section A -->

    <!-- Section B -->
    <div class="flex flex-col gap-3 px-3 py-3 border border-darkBlue">
      <div class="">
        <div class="flex justify-between items-center gap-2">
          <!-- Date part -->
          <div class="flex gap-1 items-center">
            <!-- icon type thing -->
            <div class="flex flex-col items-center max-w-min">
              <div class="h-2 w-2 rounded-full bg-grey1"></div>
              <div class="h-4 w-[0.05rem] rounded-full bg-grey1"></div>
              <div class="h-2 w-2 rounded-full bg-grey1"></div>
            </div>
            <!-- end icon thing-->
            <div class="text-sm text-[#CDC2FF] text-nowrap">
              <p> Start Date: <span class="font-light text-xs">March 1, 2024</span></p>
              <p> End Date: <span class="font-light text-xs">March 1, 2024</span></p>
            </div>
          </div>
          <!-- End Date part  -->

          <!-- icons part -->
          <div class="flex gap-1 overflow-hidden">
            <img class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/youtube.svg" alt="">
          </div>
          <!-- end icons part -->
        </div>
      </div>

      <!-- slider -->
      <div class="pt-3 h-[1.9rem] w-full bg-gray-800 relative rounded-sm">
        <div class="flex items-center z-10 gap-1 absolute right-[10%] top-1/2 bottom-1/2 max-w-fit">
          <p class=" text-right">73%</p>
          <img class="object-contain" src="/assets/icons/up-green.svg" alt="">
        </div>
        <div class="h-full w-[73%] absolute top-0 left-0 bg-gradient-to-l from-[#8F74F7] to-[#544491] rounded-sm">
        </div>
      </div>
      <!-- end slider -->

    </div>
    <!--  end Section B-->

    <!--  -->
    <div class="px-3 py-3 grid grid-cols-3 gap-4 text-nowrap text-ellipsis">
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">views</p>
        <p class="uppercase font-bold text-lg">100,355,764</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">impressions</p>
        <p class="uppercase font-bold text-lg">5,853,127</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">engagements</p>
        <p class="uppercase font-bold text-lg">20%</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">top age demographic</p>
        <p class="uppercase font-bold text-lg">21 - 34 (54% F)</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">top location</p>
        <p class="uppercase font-bold text-lg">Lagos</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">total audience</p>
        <p class="uppercase font-bold text-lg">100,355,764</p>
      </div>
    </div>
    <!--  -->


  </div>
</template>