<template>
    <div class="flex w-[98.75vw] px-2 py-5 bg-[#100C21]">
        <div class="w-[25%]">
            <Sidebar/>
        </div>

        <div class="w-[75%]">
            <Header/>
            <div class="p-3 pl-8">
                <slot/>
            </div>
        </div>
    </div>
</template>