

<template>


    <div class="px-4 md:px-16">
        <button class="flex justify-center items-center gap-2 rounded bg-[#5331E8] py-4 w-full text-white">
            {{message}}
            <Spinner :loading="loading" />
        </button>
    </div>
</template>

<script setup>
    const props = defineProps({
    message: String,
    loading: Boolean
    })
</script>