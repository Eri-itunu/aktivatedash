<template>
    <div class="flex  max-lg:w-full px-2 py-5 bg-[#100C21]">
        <div class="w-[25%] max-lg:hidden">
            <Sidebar/>
        </div>

        <div class="w-[75%] max-lg:w-[100%]">
            <Header/>
            <div class="p-3 pl-8 max-lg:pl-3">
                <slot/>
            </div>


        </div>
    </div>
</template>