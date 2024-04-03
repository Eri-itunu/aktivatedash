<template>
    <div class="flex   px-2 py-5 bg-[#100C21]">
        <div class= " w-24 md:w-96 ">
            <Sidebar/>
        </div>

        <div class="w-full overflow-hidden">
            <Header/>
            <div class="p-3 pl-8 max-lg:pl-3">
                <slot/>
            </div>


        </div>
    </div>
</template>