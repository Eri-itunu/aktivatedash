<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Info } from "lucide-vue-next"

const payoutHistory = [
  { date: 'Mar 1, 2025', amount: '$1,245', status: 'Completed', method: 'Bank Transfer' },
  { date: 'Mar 5, 2025', amount: '$2,300', status: 'Failed', method: 'Credit Card' },
  { date: 'Mar 10, 2025', amount: '$500', status: 'Failed', method: 'PayPal' },
  { date: 'Mar 1, 2025', amount: '$1,245', status: 'Completed', method: 'Bank Transfer' },
  { date: 'Mar 1, 2025', amount: '$1,245', status: 'Completed', method: 'Bank Transfer' }
]

const pendingEarnings = [
  { 
    name: 'Wireless Earbuds', 
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop',
    sales: 5, 
    amount: '$120', 
    payoutDay: 'Dec 1 2025' 
  }
]

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
    case 'Failed':
      return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
    default:
      return 'bg-gray-50 dark:bg-gray-800 text-gray-600'
  }
}
</script>

<template>
  <div class="space-y-6 my-8">
    <!-- Wallet Balance Card -->
    <div class="bg-gradient-to-br from-purplebg/5 to-green-400/5 dark:from-purplebg/10 dark:to-green-400/10 rounded-2xl border dark:border-gray-800 p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
      <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
        <span class="text-sm font-medium">Wallet Balance</span>
        <Info class="size-4" />
      </div>
      <h2 class="text-6xl font-bold text-gray-900 dark:text-white">$81.42</h2>
      <Button class="bg-purplebg hover:bg-purplebg/90 text-white px-8 py-6 rounded-xl font-semibold">
        Request payout
      </Button>
    </div>

    <!-- Payout History -->
    <div class="bg-white dark:bg-[#090618] rounded-2xl border dark:border-gray-800 overflow-hidden shadow-sm">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Payout History</h2>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b dark:border-gray-800">
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4">Amount</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Method</th>
            </tr>
          </thead>
          <tbody class="divide-y dark:divide-gray-800">
            <tr v-for="payout in payoutHistory" :key="payout.date + payout.amount + Math.random()" class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">{{ payout.date }}</td>
              <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">{{ payout.amount }}</td>
              <td class="px-6 py-4">
                <span :class="getStatusClass(payout.status)" class="px-3 py-1 rounded-full text-xs font-bold">
                  {{ payout.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-400">{{ payout.method }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pending Earnings -->
    <div class="bg-white dark:bg-[#090618] rounded-2xl border dark:border-gray-800 overflow-hidden shadow-sm">
      <div class="p-6 space-y-1">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Pending Earnings</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Commissions processing for next payout on Dec 1, 2025</p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b dark:border-gray-800">
              <th class="px-6 py-4">Product</th>
              <th class="px-6 py-4">Sales</th>
              <th class="px-6 py-4">Amount</th>
              <th class="px-6 py-4">Payout Day</th>
            </tr>
          </thead>
          <tbody class="divide-y dark:divide-gray-800">
            <tr v-for="item in pendingEarnings" :key="item.name" class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="item.image" :alt="item.name" class="size-10 rounded-lg object-cover" />
                  <span class="font-medium text-gray-900 dark:text-white">{{ item.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-400 font-medium">{{ item.sales }}</td>
              <td class="px-6 py-4 text-green-600 dark:text-green-400 font-bold">{{ item.amount }}</td>
              <td class="px-6 py-4">
                <span class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs font-medium border dark:border-gray-700">
                  {{ item.payoutDay }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
