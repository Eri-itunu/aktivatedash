
<template>
    <div class=" cursor-pointer rounded-md flex flex-col border-[#DEDFE6] border-[0.5px]">
        <div class="basis-1/3 rounded-t-md overflow-hidden flex items-center">
            <USkeleton class="h-[200px] w-full" />
        </div>

        <div class="basis-2/3 flex flex-col gap-1 ">
            <div class="flex flex-col gap-1 basis-3/4 p-4">
                <h3 class="text-[#5331E8]" ><USkeleton class="h-4 w-[200px]" /></h3>
                <h4 class="font-bold tracking-tight leading-5"><USkeleton class="h-4 w-3/4" /></h4>

               
            </div>

            <div class="flex basis-1/4 border-dashed border-t items-center py-2 justify-center gap-4" >
                <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
            </div>
        </div>
    </div>
</template>
