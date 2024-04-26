<template>
    <!-- 3 -->
    <div class="bg-vDarkBlue rounded-r-xl text-white text-nowrap py-3 w-full flex flex-col justify-between min-w-fit">
      <!-- Top part -->
      <div class="flex justify-between gap-2 items-center px-4">
        <div class="flex gap-2 items-center">
          <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
          <div> Active Campaigns </div>
        </div>
        <div>
          <img class="hidden md:block" src="~/assets/icons/eye-con.svg" alt="">
        </div>
      </div>
      <!-- End Top part -->
  
      <!-- Middle -->
      <div class=" py-3 border-b border-dashed border-darkBlue px-4">
        <div class="flex justify-between gap-2 items-end w-full h-full">
          <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5">5</p>
          <div class="hidden lg:block w-1/2 h-[3.8rem]">
            <SmallChart />
          </div>
        </div>
      </div>
      <!-- End Middle -->
  
      <!-- Bottom -->
      <div class="flex justify-between gap-2 items-center pt-3 px-4">
        <div class="flex gap-2">
          <img src="~/assets/icons/up-green.svg" alt="">
          <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
        </div>
        <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
      </div>
      <!-- END Bottom -->
    </div>
    <!-- END 3 -->
  </template>