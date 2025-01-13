<template>

<div class="bg-transparent p-4 rounded-md">
    <div class="flex flex-col mt-2 items-center gap-4 px-3">
        <!-- Loading placeholder for the image -->
        <div class="w-[900px] h-[400px] bg-gray-300 animate-pulse rounded-md"></div>

        <!-- Loading placeholders for text -->
        <div class="flex flex-col gap-2 border-b px-2">
            <div class="h-6 w-1/4 bg-gray-300 animate-pulse rounded"></div>
            <div class="h-4 w-1/2 bg-gray-300 animate-pulse rounded"></div>
            <div class="h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>
            <div class="h-4 w-1/3 bg-gray-300 animate-pulse rounded"></div>
            <div class="h-4 w-2/3 bg-gray-300 animate-pulse rounded"></div>
        </div>

        <!-- Loading placeholder for the application close date -->
        <div class="flex justify-start flex-col w-full py-8">
            <div class="h-6 w-1/4 bg-gray-300 animate-pulse rounded"></div>
            <div class="h-4 w-1/3 bg-gray-300 animate-pulse rounded"></div>
        </div>
    </div>

    <!-- Loading placeholders for requirements -->
    <div class="flex flex-col md:flex-row gap-6 py-4 px-3">
        <div class="md:w-1/2 flex flex-col gap-6">
            <div class="rounded-[8px] shadow-md bg-white dark:bg-vDarkBlue border p-4">
                <div class="h-6 w-1/3 bg-gray-300 animate-pulse rounded"></div>
                <div class="h-4 w-2/3 bg-gray-300 animate-pulse rounded mt-2"></div>

                <div class="border mt-5 shadow-md sm:rounded-lg">
                    <div class="h-6 w-full bg-gray-300 animate-pulse rounded mb-2"></div>
                    <div class="h-6 w-full bg-gray-300 animate-pulse rounded mb-2"></div>
                    <div class="h-6 w-full bg-gray-300 animate-pulse rounded mb-2"></div>
                </div>
            </div>

            <div class="rounded-[8px] shadow-md border p-4 bg-white dark:bg-vDarkBlue">
                <div class="h-6 w-1/3 bg-gray-300 animate-pulse rounded"></div>
                <div class="h-4 w-full bg-gray-300 animate-pulse rounded mt-2"></div>
                <div class="h-4 w-2/3 bg-gray-300 animate-pulse rounded mt-2"></div>
            </div>
        </div>

        <div class="md:w-1/2 flex flex-col gap-6">
            <div class="flex flex-col gap-2 shadow-md rounded-lg bg-white dark:bg-vDarkBlue p-4 border">
                <div class="h-6 w-1/3 bg-gray-300 animate-pulse rounded"></div>
                <div class="h-4 w-2/3 bg-gray-300 animate-pulse rounded mt-2"></div>
                <div class="h-4 w-1/2 bg-gray-300 animate-pulse rounded mt-2"></div>
            </div>

            <div class="flex flex-col gap-2 shadow-md rounded-lg bg-white dark:bg-vDarkBlue p-4 border">
                <div class="h-6 w-1/3 bg-gray-300 animate-pulse rounded"></div>
                <div class="h-4 w-2/3 bg-gray-300 animate-pulse rounded mt-2"></div>
                <div class="h-4 w-full bg-gray-300 animate-pulse rounded mt-2"></div>
            </div>
        </div>
    </div>

    <div class="w-full border-t p-4 flex items-center justify-center">
        <div class="h-10 w-32 bg-gray-300 animate-pulse rounded-full"></div>
    </div>
</div>

</template>