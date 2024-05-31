<script setup lang="ts">

    const props = defineProps({
        title: String,
        togglePopup: Function

    })
</script>

<template>
    <div  class="fixed top-0 bottom-0 right-0 left-0 z-10 flex items-center  justify-center bg-[#000000] opacity-[1]">
        <div class="flex items-center flex-col justify-center z-20 p-auto bg-[#100C21] opacity-[1] rounded-lg p-8 ">
            <div class='flex justify-between items-center w-full mb-2  py-1  border-b border-b-[#1D192F]'>
                <h1>{{ title }}</h1>

                <UButton @click="togglePopup()" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" />
            </div>
            
            <slot/>
        </div>
        
    </div>
</template>