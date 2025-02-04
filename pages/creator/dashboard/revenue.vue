<script setup lang="ts">

    definePageMeta({
    layout: 'dashboard',
    colorMode: 'dark'
    })

const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]

import { ref } from 'vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}


</script>

<template>
  <div class="flex flex-col gap-10">

    

    <div class="flex flex-wrap gap-5 justify-end">
    
      
      <button  @click="openModal" class="rounded-[100px] px-4 py-2 bg-[#5331E8] text-white" >
        <div class="flex flex-row gap-1">
          
          <p class="hidden md:block">Withdraw Funds</p>
       </div>
      </button>
    </div>

    <DashboardMetricsSection />
     
  </div>
</template>

