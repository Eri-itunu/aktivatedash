<script setup lang="ts">
const props = defineProps({
    error: String
})
</script>

<template>

    <div class="fixed w-full top-[20px] left-[550px]">
        <div class="p-2 text-white bg-purple1 rounded-lg m-auto max-w-[400px]">
            {{ error }}
        </div>
    </div>
</template> 