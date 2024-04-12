<script setup lang="ts">
const props = defineProps({
  height: Number,
  color: String
})
const colorMap = {
  green: "#6EFFA8",
  red: "#FF0000",
  grey: "#CDC2FF",
}

</script>


<template>
<div :class="bgColor" :style="{ height: `${props.height}%`, 'background-color': `${colorMap[props.color]}` }" class="w-[1rem] rounded-sm" >  </div>
</template>

