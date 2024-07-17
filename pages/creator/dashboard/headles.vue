<script  >
  definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="container mx-auto">
      <div class="w-72">

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  
  const people = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' }
  ]
  const selectedPerson = ref(people[0])
  </script>
  