<template>
    <div class="flex h-screen w-screen overflow-hidden px-2 py-5 bg-[#100C21]">
        <div class="w-[25%] ">
            <Sidebar/>
        </div>

        <div class="w-[75%] overflow-y-scroll">
            <Header/>


            <div class="p-3 pl-8  ">
                <slot />
            </div>


        </div>
    </div>
</template>