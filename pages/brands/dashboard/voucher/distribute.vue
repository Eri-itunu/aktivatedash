<template>
    <div v-if="!sentVoucher" class="h-full flex flex-col p-24 mt-1 md:mt-12 md:p-8 items-center" >
        <div class="w-full flex flex-col gap-4 items-center text-center text-pretty" >
          <!-- Display Total Amount -->
          <span class="w-full text-left">
            <h1 class="text-2xl font-semibold">Distribute vouchers to SMEs</h1>
            Total Allocated: {{ totalAmount }} <!-- Displaying the sum here -->
          </span>
            <div class="bg-white dark:bg-vDarkBlue p-8 rounded w-full" >
                <div class="flex justify-between">
                    <h2 class="text-xs" >SME BUSINESS EMAIL</h2>
                    <h2 class="text-xs">AMOUNT TO ALLOCATE</h2>
                    <h2 class="text-xs">VOUCHER CODE AUTO GENERATED</h2>
                </div>
                <form class="py-4 space-y-4 w-full items-start ">
                    <div v-for="(row, index) in rows" :key="index" class="flex gap-4 items-center">
                    <!-- Email Input -->
                    <input
                        v-model="row.email"
                        type="email"
                        placeholder="Enter email"
                        class="border-b border-gray-300 w-full py-2 outline-none bg-transparent"
                        required
                    />

                    <!-- Amount Input -->
                    <input
                        v-model.number="row.amount"  
                        type="number" 
                        placeholder="Enter amount"
                        class="border-b border-gray-300 w-full py-2 outline-none bg-transparent"
                        required
                    />

                    <!-- Voucher Code (disabled) -->
                    <input
                        :value="row.voucherCode"
                        disabled
                        class="border-b border-gray-300 w-full py-2 text-gray-500 bg-gray-100 cursor-not-allowed"
                    />

                    <!-- Remove Row Button -->
                    <button type="button" @click="removeRow(index)" class="text-red-500 font-bold px-2">
                        ×
                    </button>
                    </div>

                    <!-- Add Row Button -->
                    <button
                    type="button"
                    @click="addRow"
                    class="flex gap-2 items-center  rounded-md border-2 p-2 text-sm"
                    >
                    + Add Another SME
                    </button>
                    <div class="flex border-t-2 py-2 flex-col gap-3 my-4">
                        <span class="flex justify-between">
                            <p>Total allocated:</p>
                            <p>{{ totalAmount }} <!-- Displaying total here --></p>
                        </span>
                        <span class="flex justify-between">
                            <p>Remaining balance</p>
                            <p :class="{'text-red-500': remainingBalance < 0}">{{ remainingBalance }}</p>
                        </span>
                    </div>
                    <button type="submit" class="w-full flex items-center text-center btn-custom" >
                        Generate codes and send emails
                    </button>
                </form>

                
            </div>
        </div>
    </div>
    <div v-else class="h-full flex flex-col p-8 md:p-24 gap-4 items-center justify-center" >
        <div class="flex p-8 md:p-24 bg-white dark:bg-vDarkBlue flex-col rounded-md gap-2 items-center justify-center">
            <BadgeCheck class="w-24 h-24" />
            <h1 class="font-semibold text-2xl">Voucher funded successfully</h1>
            <p> is now available for distribution to selected SMEs</p>
            <span class="flex gap-2">
                <nuxt-link to="/brands/dashboard/voucher/distribute" class="btn-custom ">Distribute to SMEs</nuxt-link>
                <nuxt-link to="/brands/dashboard/voucher" class="flex gap-2 items-center  rounded-md border-2 p-2"> <ChevronLeft/> Back to voucher dashbaord</nuxt-link>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts" >
import { Ticket, Plus} from "lucide-vue-next";
definePageMeta({
  layout: "light",
});

const route = useRoute();
const id = route.query.id as string;
const amount = route.query.amount as string;
const initialAmount = parseFloat(amount) || 0;

// Utility to generate a random voucher code
const generateVoucherCode = () => Math.random().toString(36).substring(2, 10).toUpperCase();
const sentVoucher = ref(false)

// Row structure
interface Row {
  email: string;
  amount: number;
  voucherCode: string;
}

const rows = ref<Row[]>([
  { email: '', amount: 0 , voucherCode: generateVoucherCode() }
]);

const addRow = () => {
  rows.value.push({ email: '', amount: 0, voucherCode: generateVoucherCode() });
};

// Compute total amount
const totalAmount = computed(() => {
  return rows.value.reduce((sum, row) => sum + row.amount, 0);
});

const remainingBalance = computed(() => {
  return initialAmount - totalAmount.value;
});

const removeRow = (index: number) => {
  if (rows.value.length > 1) {
    rows.value.splice(index, 1);
  }
};
</script>
