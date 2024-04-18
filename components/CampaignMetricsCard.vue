<template>
  <!-- 2 -->
  <div class="bg-vDarkBlue border-x border-darkBlue text-white text-nowrap flex flex-col justify-between py-3 w-full min-w-fit">
    <!-- Top part -->
    <div class="flex justify-between items-center px-1 md:px-4">
      <div class="flex gap-2 items-center">
        <img  src="~/assets/icons/aktivate-logo-small.svg" alt="">
        <div class=""> Campaigns </div>
      </div>
      <div>
        <img class="hidden md:block" src="~/assets/icons/eye-con.svg" alt="">
      </div>
    </div>
    <!-- End Top part -->

    <!-- Middle -->
    <div class=" py-3 border-b border-dashed border-darkBlue px-4">
      <div class="flex justify-between gap-2 items-end w-full h-full">
        <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5">$ 1,434.32</p>
        <div class="hidden lg:block w-1/2 h-[3.8rem]">
          <SmallChart />
        </div>
      </div>
    </div>
    <!-- End Middle -->

    <!-- Bottom -->
    <div class="flex justify-between gap-2 items-center pt-3 px-4">
      <div class="flex gap-2">
        <img src="~/assets/icons/down-red.svg" alt="">
        <p class="text-sm md:text-lg text-red1"> -11.45%</p>
      </div>
      <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
    </div>
    <!-- END Bottom -->
  </div>
  <!-- END 2 -->
</template>