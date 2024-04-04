<script setup lang="ts">
const props = defineProps({
  percentage: Number
})
</script>



<template>
  <div class="p-2 h-[1.9rem] w-full bg-gradient-to-r from-[#FFFFFF] to-[#999999] relative rounded-sm">
    <div class="flex items-center z-10 gap-1 absolute right-[10%] top-1/2 bottom-1/2 max-w-fit">
      <p class=" text-right">{{ props.percentage }}%</p>
      <img class="object-contain" src="/assets/icons/up-green.svg" alt="">
    </div>
    <div class="h-full absolute top-0 left-0 bg-gradient-to-r from-[#8F74F7] to-[#544491] rounded-sm"
      :style="{ width: `${props.percentage}%`}">
    </div>
  </div>
</template>
