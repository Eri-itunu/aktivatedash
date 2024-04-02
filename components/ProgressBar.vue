<script>
export default {
  props: ['percentage'],

  computed: {
    customClass() {
      return `w-[${this.percentage}%]`
    }
  }
}
</script>



<template>
  <div class="p-2 h-[1.9rem] w-full bg-gray-800 relative rounded-sm">
    <div class="flex items-center z-10 gap-1 absolute right-[10%] top-1/2 bottom-1/2 max-w-fit">
      <p class=" text-right">{{ percentage }}%</p>
      <img class="object-contain" src="/assets/icons/up-green.svg" alt="">
    </div>
    <div class="h-full absolute top-0 left-0 bg-gradient-to-l from-[#8F74F7] to-[#544491] rounded-sm"
      :class="customClass">
    </div>
  </div>
</template>
