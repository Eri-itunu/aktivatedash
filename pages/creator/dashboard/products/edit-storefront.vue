<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ChevronLeft, 
  Trash2,
  Bell
} from "lucide-vue-next"
import { Button } from "@/components/ui/button"

definePageMeta({
  layout: "dashboard",
})

const router = useRouter()

const creator = ref({
  name: 'Chiamaka Eziamaka',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=1000&auto=format&fit=crop',
  description: 'Describe your storefront'
})

const products = ref([
  {
    id: 1,
    name: 'Eco-Friendly Water Bottle',
    tag: '#Tech',
    price: 299.99,
    commission: '15%',
    image: 'https://images.unsplash.com/photo-1602143302703-f75d7b3f4185?q=80&w=1000&auto=format&fit=crop',
    caption: ''
  },
  {
    id: 2,
    name: 'Eco-Friendly Water Bottle',
    tag: '#Tech',
    price: 299.99,
    commission: '15%',
    image: 'https://images.unsplash.com/photo-1602143302703-f75d7b3f4185?q=80&w=1000&auto=format&fit=crop',
    caption: ''
  },
  {
    id: 3,
    name: 'Eco-Friendly Water Bottle',
    tag: '#Tech',
    price: 299.99,
    commission: '15%',
    image: 'https://images.unsplash.com/photo-1602143302703-f75d7b3f4185?q=80&w=1000&auto=format&fit=crop',
    caption: ''
  },
  {
    id: 4,
    name: 'Eco-Friendly Water Bottle',
    tag: '#Tech',
    price: 299.99,
    commission: '15%',
    image: 'https://images.unsplash.com/photo-1602143302703-f75d7b3f4185?q=80&w=1000&auto=format&fit=crop',
    caption: ''
  }
])

const handleBack = () => {
  router.push('/creator/dashboard/products')
}

const removeProduct = (id: number) => {
  products.value = products.value.filter(p => p.id !== id)
}
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-12 pb-20">
    <!-- Header with Back Button and Profile -->
    <div class="space-y-8">
      <div class="flex items-center gap-4">
        <button @click="handleBack" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <ChevronLeft class="size-6 text-gray-900 dark:text-white" />
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Storefront</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">Manage products in your ShopLink</p>
        </div>
      </div>

      <!-- Creator Profile Section -->
      <div class="flex flex-col items-center text-center space-y-4">
        <div class="relative">
          <img :src="creator.avatar" :alt="creator.name" class="size-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg" />
        </div>
        <div class="space-y-1">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ creator.name }}</h2>
          <p class="text-gray-500 dark:text-gray-400 font-medium">{{ creator.description }}</p>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white dark:bg-[#090618] rounded-2xl border dark:border-gray-800 p-6 shadow-sm space-y-4">
        <div class="flex justify-between items-start">
          <div class="flex gap-4">
            <img :src="product.image" :alt="product.name" class="size-20 rounded-xl object-cover" />
            <div class="space-y-1 mt-1">
              <h3 class="font-bold text-gray-900 dark:text-white leading-tight">{{ product.name }}</h3>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">{{ product.tag }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                ${{ product.price }} • {{ product.commission }} commission
              </p>
            </div>
          </div>
          <button @click="removeProduct(product.id)" class="p-2.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
            <Trash2 class="size-5" />
          </button>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase tracking-widest">Caption (Optional)</label>
          <textarea 
            v-model="product.caption"
            placeholder="Why do you love this product? How do you use it? Share it with your followers"
            class="w-full h-24 bg-gray-50 dark:bg-white/5 border dark:border-gray-800 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all placeholder:text-gray-400"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles if needed to match image exactly */
</style>
