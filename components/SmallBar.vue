<script>

export default {
  props: ['height', 'color'],

  computed: {
    customClass() {
      return `h-[${this.height}%] bg-${this.color || grey1}`
    }
  }
}

</script>


<template>
  <div :class="customClass" class="w-[1rem] rounded-sm" > </div>
</template>