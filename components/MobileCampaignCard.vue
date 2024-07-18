<template>
    <div class="rounded-lg p-2 border-2 border-[#D9D9D9]">
        <div>
            <h1>{{ headline }}</h1>
            <h2>{{ socials }}</h2>
        </div>
    </div>
</template>


<script setup lang="ts">
    defineProps({
        socials: Array,
        headline: String,

    })
</script>