<script setup>
  import Socials from 'enums/socials';

  const props = defineProps({
    collab: {
      id: String,
      name: String,
      description: String,
      startDate: String,
      endDate: String,
      socials: [String],
      budget: Number
    }
  });
  const getSocials = () => props.socials.map(social => {
    return { name: social, src: `/assets/icons/collab/${social}.svg`}
  });
</script>


<template>
  <div
    class="w-[258px] min-w-[258px] h-[295px] flex flex-col justify-between border border-grey1 rounded-lg bg-vDarkBlue text-white py-2">
    <!--  -->
    <div class="flex justify-between items-center pb-2 px-3  border-b border-b-darkBlue">
      <div class="flex gap-3">
        <p> i </p>
        <p> {{ collab.name }}</p>
      </div>
      <p class="underline text-grey1 text-xs"> view details</p>
    </div>
    <!--  -->
    <div class="flex flex-col gap-5 px-3 py-2">
      <p class="text-sm text-ellipsis line-clamp-2">{{ collab.description }}.</p>
      <div class="flex items-center gap-2">
        <!-- icon type thing -->
        <div class="flex flex-col items-center max-w-min">
          <div class="h-2 w-2 rounded-full bg-grey1"></div>
          <div class="h-4 w-[0.05rem] rounded-full bg-grey1"></div>
          <div class="h-2 w-2 rounded-full bg-grey1"></div>
        </div>
        <!--  -->
        <div class="text-sm text-[#CDC2FF]">
          <p> Start Date: <span class="font-light text-xs">{{ collab.startDate }}</span></p>
          <p> End Date: <span class="font-light text-xs">{{ collab.endDate }}</span></p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="flex gap-1 border-y border-y-darkBlue border-dashed p-2">
      <!-- <img v-for="social in getSocials" :key="social.name" class="object-contain" :src="social.src" alt="">

      <img v-for="social in collab.socials" :key="social" class="object-contain"
        :src="`/assets/icons/collab/${ social }.svg`" alt=""> -->

      <img class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
      <img class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
      <img class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
      <!-- <img class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
      <img class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
      <img class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
      <img class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
      <img class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
      <img class="object-contain" src="/assets/icons/collab/youtube.svg" alt=""> -->
    </div>
    <!--  -->
    <div class="flex justify-between items-center px-2">
      <div class="flex flex-col">
        <p class="uppercase font-light text-xs text-gray2">total budget</p>
        <p class="uppercase font-extrabold text-2xl">${{ collab.budget.toLocaleString() }}</p>
      </div>
      <button class="rounded-full bg-purple1 h-fit py-1 px-4 min-w-4">
        Opt in
      </button>
    </div>
    <!--  -->


  </div>
</template>