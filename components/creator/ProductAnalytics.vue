<script setup lang="ts">
const analyticsSummary = [
  { label: 'TOTAL VIEWS', value: '3,847' },
  { label: 'TOTAL CLICKS', value: '826' },
  { label: 'TOTAL SALES', value: '59' },
  { label: 'COMMISSION EARNED', value: '$2,845' }
]

const topProducts = [
  {
    name: 'Premium Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    clicks: 8,
    sales: 234,
    revenue: '$12,456',
    commission: '$1,867'
  },
  {
    name: 'Portable Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=1000&auto=format&fit=crop',
    clicks: 20,
    sales: 300,
    revenue: '$1,500',
    commission: '$75'
  },
  {
    name: '4K Ultra HD Smart TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop',
    clicks: 5,
    sales: 45,
    revenue: '$2,999',
    commission: '$599'
  },
  {
    name: 'Gaming Laptop',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop',
    clicks: 10,
    sales: 90,
    revenue: '$15,000',
    commission: '$1,500'
  },
  {
    name: 'Smart Fitness Tracker',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1000&auto=format&fit=crop',
    clicks: 15,
    sales: 150,
    revenue: '$3,899',
    commission: '$259'
  }
]
</script>

<template>
  <div class="space-y-6 my-8">
    <!-- Analytics Summary Cards -->
    <div class="bg-white dark:bg-[#090618] rounded-2xl border dark:border-gray-800 p-8 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div 
          v-for="(item, index) in analyticsSummary" 
          :key="item.label"
          class="flex flex-col gap-4"
          :class="{ 'md:border-r dark:border-gray-800 pr-8': index !== analyticsSummary.length - 1 }"
        >
          <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{{ item.label }}</span>
          <span class="text-4xl font-bold text-gray-900 dark:text-white">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <!-- Top Performing Products Table -->
    <div class="bg-white dark:bg-[#090618] rounded-2xl border dark:border-gray-800 overflow-hidden shadow-sm">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Top Performing Products</h2>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b dark:border-gray-800">
              <th class="px-6 py-4">Product</th>
              <th class="px-6 py-4">Clicks</th>
              <th class="px-6 py-4">Sales</th>
              <th class="px-6 py-4">Revenue</th>
              <th class="px-6 py-4">Commission</th>
            </tr>
          </thead>
          <tbody class="divide-y dark:divide-gray-800">
            <tr 
              v-for="(product, index) in topProducts" 
              :key="product.name"
              class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              :class="{ 'bg-purplebg/5': index === 0 }"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="product.image" :alt="product.name" class="size-10 rounded-lg object-cover" />
                  <span class="font-medium text-gray-900 dark:text-white">{{ product.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-400 font-medium">{{ product.clicks }}</td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-400 font-medium">{{ product.sales }}</td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-400 font-medium">{{ product.revenue }}</td>
              <td class="px-6 py-4 text-green-600 dark:text-green-400 font-bold">{{ product.commission }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
