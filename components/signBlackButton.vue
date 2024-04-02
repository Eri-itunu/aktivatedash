<template>

        <div class="flex p-4 justify-end">
            <button class="bg-black text-white px-6 py-2 rounded-[50px]">{{message}}</button>
        </div>

</template>

<script setup>
    const props = defineProps({
    message: String,

    })
</script>