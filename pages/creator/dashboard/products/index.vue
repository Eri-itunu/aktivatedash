<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from "@/components/ui/toast/use-toast"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Edit2
} from "lucide-vue-next"

definePageMeta({
  layout: "dashboard",
})

import ProductAnalytics from "@/components/creator/ProductAnalytics.vue"
import ProductWallet from "@/components/creator/ProductWallet.vue"

const { toast } = useToast()

const activeTab = ref('brand-partners')

const products = ref([
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    partner: 'AudioTech',
    price: 299.99,
    commission: '15%',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    added: false,
    inShopLink: false
  },
  {
    id: 2,
    name: 'Smart Home Hub',
    partner: 'NexGen',
    price: 149.99,
    commission: '10%',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop',
    added: true,
    inShopLink: true
  },
  {
    id: 3,
    name: 'Ultra HDR Camera',
    partner: 'VisionPro',
    price: 899.00,
    commission: '12%',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    added: false,
    inShopLink: false
  },
  {
    id: 4,
    name: 'Ergonomic Desk Chair',
    partner: 'ComfortMax',
    price: 450.00,
    commission: '8%',
    image: 'https://images.unsplash.com/photo-1505797149-43b007662c21?q=80&w=1000&auto=format&fit=crop',
    added: false,
    inShopLink: false
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    partner: 'KeyType',
    price: 129.50,
    commission: '20%',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop',
    added: false,
    inShopLink: false
  },
  {
    id: 6,
    name: 'Portable SSD 2TB',
    partner: 'DataStore',
    price: 199.99,
    commission: '5%',
    image: 'https://images.unsplash.com/photo-1597740985671-2a8a3b80ec02?q=80&w=1000&auto=format&fit=crop',
    added: false,
    inShopLink: false
  }
])

const handleAddToShopLink = (product: any) => {
  product.added = true
  
  toast({
    title: "Product added to ShopLink!",
    description: `${product.name} is now live on your storefront.`,
  })
}

const pagination = ref({
  current: 3,
  total: 30
})
</script>

<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="space-y-1">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Product Marketplace</h1>
        <p class="text-gray-500 dark:text-gray-400">Browse and add products to your store front from partnered brands</p>
      </div>
      <div class="flex gap-3">
        <NuxtLink to="/creator/dashboard/products/edit-storefront">
          <Button variant="outline" class="flex items-center gap-2 bg-white dark:bg-gray-800">
            <Edit2 class="size-4" />
            Edit Storefront
          </Button>
        </NuxtLink>
        <NuxtLink to="/creator/storefront" target="_blank">
          <Button variant="outline" class="flex items-center gap-2 bg-white dark:bg-gray-800">
            <ExternalLink class="size-4" />
            View Storefront
          </Button>
        </NuxtLink>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-8 border-b dark:border-gray-800">
      <button 
        v-for="tab in ['Brand partners', 'Analytics', 'Wallet']" 
        :key="tab"
        @click="activeTab = tab.toLowerCase().replace(' ', '-')"
        class="pb-4 text-sm font-medium transition-colors relative"
        :class="activeTab === tab.toLowerCase().replace(' ', '-') ? 'text-purplebg' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
      >
        {{ tab }}
        <div 
          v-if="activeTab === tab.toLowerCase().replace(' ', '-')" 
          class="absolute bottom-0 left-0 w-full h-0.5 bg-purplebg rounded-full"
        ></div>
      </button>
    </div>

    <!-- Content Sections -->
    <div v-show="activeTab === 'brand-partners'">
      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white dark:bg-[#090618] rounded-2xl overflow-hidden border dark:border-gray-800 shadow-sm transition-transform hover:scale-[1.01]">
          <div class="relative h-64 overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
            <div v-if="product.inShopLink" class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <span class="text-[10px] font-bold text-purplebg uppercase tracking-wider">In ShopLink</span>
            </div>
          </div>
          
          <div class="p-5 space-y-4">
            <div>
              <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ product.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ product.partner }}</p>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
              <div class="bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs font-bold text-green-600 dark:text-green-400">
                {{ product.commission }}
              </div>
            </div>
            
            <Button 
              v-if="!product.added"
              @click="handleAddToShopLink(product)"
              class="w-full bg-purplebg hover:bg-purplebg/90 text-white font-semibold py-6 rounded-xl"
            >
              Add to ShopLink
            </Button>
            <Button 
              v-else
              disabled
              class="w-full bg-gray-50 dark:bg-gray-800/50 text-gray-400 border dark:border-gray-700 py-6 rounded-xl"
            >
              Added
            </Button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between py-10">
        <p class="text-sm text-gray-500 font-medium">Page {{ pagination.current }} of {{ pagination.total }}</p>
        
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <button v-for="i in [1, 2, 3, 4, 5, 6]" :key="i" 
              class="size-8 flex items-center justify-center rounded-lg text-sm transition-colors"
              :class="i === 3 ? 'bg-purplebg/10 text-purplebg font-bold border border-purplebg/20' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'"
            >
              {{ i }}
            </button>
          </div>
          
          <div class="flex items-center gap-1 ml-4">
            <button class="size-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ChevronLeft class="size-5" />
            </button>
            <button class="size-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ChevronRight class="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Section -->
    <ProductAnalytics v-if="activeTab === 'analytics'" />

    <!-- Wallet Section -->
    <ProductWallet v-if="activeTab === 'wallet'" />
  </div>
</template>

<style scoped>
/* Add any local styles if needed */
</style>
