<template>
  <div class="bg-vDarkBlue rounded-xl text-white py-3 w-full flex flex-col justify-between min-w-fit border border-darkBlue/50">
    <div class="flex justify-between gap-2 items-center px-4">
      <div class="flex gap-2 items-center">
        <USkeleton class="h-4 w-20" />
      </div>
      <div>
        <USkeleton class="h-5 w-5 rounded-full" />
      </div>
    </div>
    <div class="py-3 px-4 mt-2">
      <div class="flex justify-between gap-2 items-end w-full h-full">
        <USkeleton class="h-8 w-24" />
        <div class="hidden lg:block w-1/2 h-[3.8rem]">
          <USkeleton class="h-full w-full rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template>
