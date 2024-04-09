<template>
    <div class="flex px-2 py-5 bg-[#100C21]">
        <div class= " hidden  md:block md:w-96 ">
            <Sidebar/>
        </div>

        <div class="w-full overflow-hidden overflow-y-scroll h-screen ">
            <Header  />
            <div class="overflow-hidden h-full overflow-y-scroll overflow-x-hidden p-3">
                <slot/>
            </div>


        </div>
    </div>
</template>

<script setup>
    

</script>