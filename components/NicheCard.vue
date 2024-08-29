<script setup lang="ts" >
    const props = defineProps({
        niche: String
    })

</script>

<template>
    <div class="rounded-[16px] px-[12px] py-[4px] bg-white text-black" >
        <p># {{ niche }} </p>
    </div>
</template>