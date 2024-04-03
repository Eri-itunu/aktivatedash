<script setup lang="ts">

    definePageMeta({
    layout: 'dashboard'
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
  <div class="flex flex-col gap-5">

    <div class="flex flex-wrap gap-5 justify-between">
      <UButton  @click="openModal" size="lg" color = "purple" :ui="{ rounded: 'rounded-full',  }">
       <div class="flex flex-row gap-1">
          <img src="../../assets/icons/down-arrow.svg" alt="">
          <p class="hidden md:block">Deposit Funds</p>
       </div>
      </UButton>
      <HeadlessTransitionRoot appear :show="isOpen" as="template">
        <HeadlessDialog as="div" @close="closeModal" class="relative z-10">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </HeadlessTransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <HeadlessTransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <HeadlessDialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <HeadlessDialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </HeadlessDialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent you
                      an email with all of the details of your order.
                    </p>
                  </div>

                  <div class="mt-4">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="closeModal"
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </HeadlessDialogPanel>
              </HeadlessTransitionChild>
            </div>
          </div>
        </HeadlessDialog>
      </HeadlessTransitionRoot>
      <UButton size="lg" color = "violet" :ui="{ rounded: 'rounded-full',  }">
        <div class="flex flex-row gap-1">
          <img src="../../assets/icons/up-arrow.svg" alt="">
          <p class="hidden md:block">Withdraw Funds</p>
       </div>
      </UButton>
    </div>

    <MetricSection />
    <div class="border-[1px]  rounded-lg">
      <UTable :rows="people" />
    </div>
  </div>
</template>

