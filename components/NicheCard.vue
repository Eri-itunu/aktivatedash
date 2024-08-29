<script setup lang="ts" >
    const props = defineProps({
        niche: String
    })
    const device = useDevice()
</script>

<template>
    <div v-if="!device.isMobile"  class="rounded-[16px] px-[12px] py-[4px] bg-white text-black" >
        <p># {{ niche }} </p> 
    </div>

    <div v-else  class="rounded-[100px] border-[0.5px] text-purple1 border-purple1 px-2 py-[1.5px] text-purple flex w-full" >
        <p>#{{ niche }}</p>
    </div>
</template>