<script setup lang="ts">

    const props = defineProps({
        title: String,
        togglePopup: Function,
        image: Boolean,
        link: String,
        header: Boolean


    })
</script>

<template>
    <div   class="fixed top-0 bottom-0 right-0 left-0 z-10 flex items-center  justify-center bg-[#000000] opacity-[1] ">
        <div class=" max-w-[90%] max-h-[90%] flex items-center flex-col justify-center z-20 bg-[#100C21] opacity-[1] rounded-lg  ">
            <div v-if="image" class="flex relative w-full justify-center  bg-purplelabel rounded-t-lg">
                <UButton color="black" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 absolute top-0 right-0" @click="togglePopup" />
                <img src="/assets/images/complete2.svg" alt="">
            </div>
            <div  class="px-8 py-4">
                <div v-if="!image" class='flex justify-between items-center w-full mb-2 text-white py-1  '
                :class="{'border-b border-b-[#1D192F]': header}"
                >
                
                    <h1 v-if="header" class=" text-purplelabel font-bold text-xl">{{ title }}</h1>

                    <UButton v-if="header" @click="togglePopup()" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" />
                </div>
                <div v-if="image"  class="flex justify-center items-center">
                    <h1 class="font-bold text-xl">{{ title }}</h1>
                </div>
                
                <div class="max-w-fit  ">
                    <slot/>
                </div>
            </div>
        </div>
        
    </div>
</template>