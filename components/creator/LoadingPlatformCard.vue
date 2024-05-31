



<template>

<div class="flex flex-col gap-4">
  <div class="flex flex-row rounded-lg bg-vDarkBlue text-white ">
    <div class="flex items-center justify-center py-8 w-1/12 border-r-2 border-darkBlue ">

        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
    </div>
    <div class="w-11/12 flex flex-col  ">
      <div class="flex border-b-2 border-darkBlue">
        <div class="w-1/3 border-r-2 py-4 border-darkBlue">
        <div class="flex justify-between gap-2 items-center px-4">
          <div class="flex gap-2 items-center">
            
            <USkeleton class="h-4 w-[200px]" />
          </div>
        </div>
        <!-- End Top part -->

        <!-- Middle -->
        <div class=" py-3  border-darkBlue px-4">
          <div class="flex justify-between gap-2 items-end w-full h-full">
            <USkeleton class="h-4 w-[200px]" />

            <div class="hidden lg:block w-1/2 h-[3.8rem]">
            </div>
          </div>
        </div>
        <!-- End Middle -->

        <!-- Bottom -->
        <!-- <div class="flex justify-between gap-2 items-center pt-3 px-4">
          <div class="flex gap-2">
            <img src="~/assets/icons/up-green.svg" alt="">
            <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
          </div>
          <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
        </div> -->
      </div>
      <div class="w-1/3 border-r-2 py-4 border-darkBlue">
        <div class="flex justify-between gap-2 items-center px-4">
          <div class="flex gap-2 items-center">
            
            <USkeleton class="h-4 w-[200px]" />
          </div>

        </div>
        <!-- End Top part -->

        <!-- Middle -->
        <div class=" py-3   border-darkBlue px-4">
          <div class="flex justify-between gap-2 items-end w-full h-full">
            <USkeleton class="h-4 w-[200px]" />
            <div class="hidden lg:block w-1/2 h-[3.8rem]">

            </div>
          </div>
        </div>
        <!-- End Middle -->

        <!-- Bottom -->
        <!-- <div class="flex justify-between gap-2 items-center pt-3 px-4">
          <div class="flex gap-2">
            <img src="~/assets/icons/up-green.svg" alt="">
            <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
          </div>
          <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
        </div> -->
      </div>
      <div class="w-1/3 py-4">
        <div class="flex justify-between gap-2 items-center px-4">
          <div class="flex gap-2 items-center">
            
            <USkeleton class="h-4 w-[200px]" />
          </div>

        </div>
        <!-- End Top part -->

        <!-- Middle -->
        <div class=" py-3  border-darkBlue px-4">
          <div class="flex justify-between gap-2 items-end w-full h-full">
            <USkeleton class="h-4 w-[200px]" />
            <div class="hidden lg:block w-1/2 h-[3.8rem]">

            </div>
          </div>
        </div>
        <!-- End Middle -->

        <!-- Bottom -->
        <!-- <div class="flex justify-between gap-2 items-center pt-3 px-4">
          <div class="flex gap-2">
            <img src="~/assets/icons/down-red.svg" alt="">
            <p class="text-sm md:text-lg text-red1"> 21.45%</p>
          </div>
          <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
        </div> -->
      </div>
      </div>
      <div class="flex p-4 justify-center">

        <USkeleton class="h-4 w-[250px]" />
        

      </div>
    </div>
  </div>

  
  
</div>
</template>