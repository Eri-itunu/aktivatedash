<script setup>

import { ref } from 'vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
definePageMeta({
  layout: 'dashboard',
})

</script>

<template>
    <div class="flex mt-8 flex-col md:flex-row gap-20">
        <div class="flex flex-col gap-2">
            <img src="../../assets/images/Avatar.svg" class="border-4 border-purple1 rounded-full items-center p-0.5 w-48" alt="">
            <p class="text-center underline"> Change Avi</p>
        </div>

        <div class="mt-4 md:w-[500px] flex gap-5 flex-col">
            <h1 class="text-3xl">Akin Olumide</h1>

            <p class="text-wrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>

            <div class="flex flex-row gap-5">
                <UButton  @click="openModal" size="lg" color = "violet" :ui="{ rounded: 'rounded-full',  }">
                    Edit Profile
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
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-vDarkBlue p-6 text-left align-middle shadow-xl transition-all"
                            >
                            <div class="flex justify-between">
                                <HeadlessDialogTitle
                                    as="h3"
                                    class="text-lg font-medium leading-6 text-purplelabel"
                                >
                                    Edit Profile
                                </HeadlessDialogTitle>

                                <div class=" rounded-full">
                                    <UIcon name="i-heroicons-light-bulb" />
                                    
                                </div>
                            </div>
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
                                x
                                </button>
                            </div>
                            </HeadlessDialogPanel>
                        </HeadlessTransitionChild>
                        </div>
                    </div>
                    </HeadlessDialog>
                </HeadlessTransitionRoot>
                <UButton size="lg" color = "purple" :ui="{ rounded: 'rounded-full',  }">
                    Change Password
                </UButton>
            </div>

        </div>
    </div>
</template>