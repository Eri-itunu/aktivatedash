<template>

    <div class="min-w-[258px]   flex flex-col justify-between border  border-grey1 rounded-lg bg-vDarkBlue text-white py-4 ">
        <div class="flex items-center space-x-4">
            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
            <div class="space-y-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[200px]" />
            </div>
        </div>
    </div>
</template>