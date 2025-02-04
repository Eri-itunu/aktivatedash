
<template>
    <nuxt-link 
      class="min-w-[258px] h-[320px]  flex flex-col justify-between border  border-grey1 rounded-lg bg-white dark:bg-vDarkBlue text-white py-4 ">
      <!--  -->
      <div class="flex gap-2 justify-between items-center pb-2 px-3  border-b border-b-darkBlue">
        <div class="flex items-center gap-3">
          
          <p > <USkeleton class="h-4 w-[100px]" /></p>
  
        </div>
    
      </div>
      <!--  -->
      <div class="flex flex-col gap-5 px-3 py-2">
        <p > <USkeleton class="h-4 w-[180px]" /></p>
  
        <div class="flex items-center gap-2">
          <!-- icon type thing -->
         
          <!--  -->
          <div class="text-sm text-[#CDC2FF]">
            <p > <USkeleton class="h-4 w-[200px]" /></p>
          </div>
        </div>
      </div>
      <!--  -->
  
  
      <div class="flex gap-1 border-y border-y-darkBlue border-dashed p-2">
  
        
  
        <USkeleton class="h-7 w-7" :ui="{ rounded: 'rounded-full' }" />
        <USkeleton class="h-7 w-7" :ui="{ rounded: 'rounded-full' }" />
        <USkeleton class="h-7 w-7" :ui="{ rounded: 'rounded-full' }" />
  
      </div>
      <!--  -->
      <div class="flex justify-between flex-col gap-2  px-2">
        <div class="flex flex-col items-start">
  
          <p > <USkeleton class="h-4 w-[200px]" /></p>
  
  
          
        </div>
        <div>
          <USkeleton class="h-7 w-24" :ui="{ rounded: 'rounded-full' }" />
          
        </div>
      </div>
      <!--  -->
  
  
    </nuxt-link>
  </template>