<script setup lang="ts" >
import { Ticket, Plus, BadgeCheck, ChevronLeft} from "lucide-vue-next";
definePageMeta({
  layout: "light",
});


const formattedAmount = ref('');

const payment = ref(false)
import { useForm, useField } from 'vee-validate';
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { ref } from 'vue';

// Zod schema
const schema = zod.object({
    amount: zod
  .string()
  .regex(/^\d+$/, 'Enter a valid amount'),
  description: zod
    .string()
    .min(3, 'Description is too short'),
});

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
});

const { value: amount, errorMessage: amountError } = useField('amount');
const { value: description, errorMessage: descriptionError } = useField('description');

const formatAmount = (value: string) => {
  const raw = value.replace(/,/g, '').replace(/\D/g, '');
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const onAmountInput = (e: Event) => {
  const input = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
  amount.value = input;
  formattedAmount.value = formatNumber(input);
};

const formatNumber = (value: string): string => {
  if (!value) return '';
  return parseInt(value).toLocaleString();
};

const onSubmit = handleSubmit((values) => {
  console.log('Submitted values:', values);
  payment.value = true
});


</script>

<template>
    <div v-if="!payment" class="h-full flex flex-col p-8 md:p-24 gap-4 items-center" >
        
       <span class="w-full text-left">
        <h1 class="text-3xl text-left font-semibold">Fund your voucher</h1>
       </span>
        <form @submit.prevent="onSubmit" class="w-full rounded-md bg-white dark:bg-vDarkBlue flex flex-col gap-1 items-center text-left text-pretty border  p-8" >
            <div class="w-full space-y-6">
                <!-- Voucher Input -->
                <div class="relative border-b border-gray-300">
                    
                    <span class="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                    <input
                        v-model="formattedAmount"
                        @input="onAmountInput"
                        placeholder="Enter total amount"
                        class="pl-5 w-full py-2 bg-transparent outline-none"
                        inputmode="numeric"
                        autocomplete="off"
                    />
                    <p class="text-red-500 text-xs mt-1">{{ amountError }}</p>
                </div>

                <!-- Description Input -->
                <div class="border-b border-gray-300">
                <p>Description</p>
                <input
                    v-model="description"
                    placeholder="Enter a description"
                    class="w-full py-2 bg-transparent outline-none"
                />
                <p class="text-red-500 text-xs mt-1">{{ descriptionError }}</p>
                </div>

                <!-- Submit Button -->
                <button
                class="w-full bg-black text-white py-3 rounded hover:opacity-90 transition"
                type="submit"
                >
                Proceed to payment
                </button>
            </div>
        </form>
       
    </div>
    <div v-else class="h-full flex flex-col p-8 md:p-24 gap-4 items-center justify-center" >
        <div class="flex p-8 md:p-24 bg-white dark:bg-vDarkBlue flex-col rounded-md gap-2 items-center justify-center">
            <BadgeCheck class="w-24 h-24" />
            <h1 class="font-semibold text-2xl">Voucher funded successfully</h1>
            <p>₦{{ formattedAmount }} is now available for dIstribution to selected SMEs</p>
            <span class="flex gap-2">
                <nuxt-link to="/brands/dashboard/voucher/distribute" class="btn-custom ">Distribute to SMEs</nuxt-link>
                <nuxt-link to="/brands/dashboard/voucher" class="flex gap-2 items-center  rounded-md border-2 p-2"> <ChevronLeft/> Back to voucher dashbaord</nuxt-link>
            </span>
        </div>
    </div>
</template>

