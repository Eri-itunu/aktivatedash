

<template>


    <div class="px-4 md:px-16">
        <button class="rounded bg-[#5331E8] py-4 w-full text-white">
            {{message}}
        </button>
    </div>
</template>

<script setup>
    const props = defineProps({
    message: String
    })
</script>