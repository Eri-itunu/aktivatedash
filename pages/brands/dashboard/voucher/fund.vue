<script setup lang="ts" >

import { ArrowLeft,Ticket, Plus, BadgeCheck, ChevronLeft, Copy} from "lucide-vue-next";

definePageMeta({
  layout: "light",
});

const config = useRuntimeConfig();
const apiUrl = config.public.API_URL as string;
const userStore = useUserStore();
const accessToken = userStore.accessToken as string;
const formattedAmount = ref('');

import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
import { useForm, useField } from 'vee-validate';
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { ref } from 'vue';

const { submit, loading, error, success, isPaid, voucherId } = useFundVoucher();
const { createdVouchers, myVoucher, loading: checking, fetchVouchers, checkIfPaid } = useVouchersDetails();

const payment = ref(false);
const paid = ref(false)

const checkPayment =async()=>{
  await fetchVouchers(accessToken, apiUrl, voucherId.value)
  paid.value = checkIfPaid.value === true;
  if(paid.value){
    toast({ title: 'Payment successful', variant: 'success', });
  }else{
    toast({ title: 'Payment not confirmed', variant: 'destructive', });
  }

}
// Zod schema
const schema = zod.object({
    amount: zod
  .string()
  .regex(/^\d+$/, 'Enter a valid amount'),
  description: zod
    .string()
    .min(3, 'Description is too short'),
  expiryDate: zod
    .string()
    .refine((val) => {
      const inputDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time part for accurate comparison
      return inputDate > today;
    }, {
      message: 'Date must be after today',
  }),
});

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
});

const { value: amount, errorMessage: amountError } = useField('amount');
const { value: description, errorMessage: descriptionError } = useField('description');
const { value: expiryDate, errorMessage: expiryDateError } = useField('expiryDate');

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


const onSubmit = handleSubmit(async (values) => {
  console.log('Submitted values:', values);
  const res = await submit({
    values,
    accessToken,
    apiUrl,
  });



  if (success.value) {
    payment.value = true;
    paid.value = isPaid.value
  }
});



</script>

<template>
    <div class="w-full flex items-start p-8 md:px-24 mt-2 mb-10" >
      <nuxt-link class="flex" to="/brands/dashboard/voucher" >
        <ArrowLeft/>
        Back
      </nuxt-link>
    </div>
    <div v-if="!payment && !loading" class="h-full flex flex-col px-8 md:px-24 gap-4 items-center" >
    
      <span class="w-full text-left">
        <h1 class="text-3xl text-left font-semibold">Fund your voucher</h1>
      </span>
      <form @submit.prevent="onSubmit" class="w-full rounded-md bg-white dark:bg-vDarkBlue flex flex-col gap-1 items-center text-left text-pretty border  px-8">
          <div class="w-full space-y-6">
            <!-- Voucher Input -->
            <p>Amount</p>
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

            <!-- Date Input -->
            <div class="border-b border-gray-300">
              <p>Date</p>
              <input
                type="date"
                v-model="expiryDate"
                class="w-full py-2 bg-transparent outline-none"
              />
              <p class="text-red-500 text-xs mt-1">{{ expiryDateError }}</p>
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
    <div v-if="paid && !loading" class="h-full flex flex-col px-8 md:px-24 gap-4 items-center justify-center" >
      
        <div class="flex p-8 md:p-24 bg-white dark:bg-vDarkBlue flex-col rounded-md gap-2 items-center justify-center">
            <BadgeCheck class="w-24 h-24" />
            <h1 class="font-semibold text-2xl">Voucher funded successfully</h1>
            <p>₦{{ formattedAmount }} is now available for distribution to selected SMEs</p>
            <span class="flex gap-2">
                <nuxt-link :to="`/brands/dashboard/voucher/distribute?id=${voucherId}&amount=${amount}`" class="btn-custom ">Distribute to SMEs</nuxt-link>
                <nuxt-link to="/brands/dashboard/voucher" class="flex gap-2 items-center  rounded-md border-2 p-2"> <ChevronLeft/> Back to voucher dashbaord</nuxt-link>
            </span>
        </div>
   
    </div>
    <div v-if="payment && !loading && !paid"  class="h-full text-center items-center gap-4 w-full justify-center flex p-8 flex-col" >
      
      <h1 class="text-2xl font-semibold">Transfer NGN {{formattedAmount }} to Aktivate Technologies</h1>
     
      <div class="w-full md:w-1/2 text-left rounded bg-white dark:bg-vDarkBlue p-2">
        <div class="border-dashed border-b-2 flex flex-col gap-5 p-4">
          <span >
            <h2>Bank Name</h2>
            <h2>Wema</h2>
          </span>

          <span>
            <h2>Account Number</h2>
            <span class="w-full justify-between flex"> 
              <h2>9020001083 </h2>
              <Copy/>
            </span>
          </span>

          <span>
            <h2>Amount</h2>
            <span class="w-full justify-between flex"> 
              <h2>NGN {{formattedAmount}}</h2>
              <Copy/>
            </span>
          </span>
        </div>
        <div class="text-center flex justify-center ">
          <p class="w-full md:w-2/3">Once payment is confirmed, your voucher dashboard will be activated</p>
        </div>
      </div>

      <button
        @click="checkPayment"
        :disabled="checking"
        class="border rounded p-2 flex w-full md:w-1/2 justify-center text-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        I've sent the money
      </button>
    </div>
</template>

