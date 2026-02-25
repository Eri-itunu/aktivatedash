<script setup lang="ts">
import { ref } from 'vue'
import { 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  Share2,
  MoreHorizontal,
  Info,
  ExternalLink
} from "lucide-vue-next"
import { Button } from "@/components/ui/button"

// Public storefront doesn't use the dashboard layout
definePageMeta({
  layout: false,
})

const creator = ref({
  name: 'Chiamaka Eziamaka',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=1000&auto=format&fit=crop',
  description: 'My Recommendations, products I love and use every day',
  coverImage: 'linear-gradient(to right, #cfd9df 0%, #e2ebf0 100%)' // Placeholder for gradient in image
})

const products = ref([
  {
    id: 1,
    brand: 'AudioTech',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1602143302703-f75d7b3f4185?q=80&w=1000&auto=format&fit=crop',
    comments: 1,
    description: 'It provides premium, phone-free sleep content, aiding in nightly relaxation and deep sleep and ...'
  },
  {
    id: 2,
    brand: 'AudioTech',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1602143302703-f75d7b3f4185?q=80&w=1000&auto=format&fit=crop',
    comments: 0,
    description: 'It provides premium, phone-free sleep content, aiding in nightly relaxation and deep sleep and ...'
  },
  {
    id: 3,
    brand: 'AudioTech',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1602143302703-f75d7b3f4185?q=80&w=1000&auto=format&fit=crop',
    comments: 0,
    description: 'It provides premium, phone-free sleep content, aiding in nightly relaxation and deep sleep and ...'
  }
])
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center gap-2">
        <img src="/icons/AktivateLogo.svg" alt="Aktivate" class="h-6" />
        <span class="text-xs text-gray-400 font-medium">Join aktivate and apply to campaigns!</span>
      </div>
      <Button class="bg-[#5a42f5] hover:bg-[#4a32e5] text-white px-6 py-2 rounded-lg font-bold text-sm uppercase">
        Sign Up
      </Button>
    </nav>

    <!-- Header Section -->
    <div class="w-full max-w-6xl mx-auto px-6 pt-10 pb-16 space-y-8">
      <!-- Gradient Banner -->
      <div class="h-40 rounded-[2rem] bg-gradient-to-r from-[#eef2f3] to-[#8e9eab] opacity-50 relative"></div>
      
      <!-- Profile Content -->
      <div class="flex flex-col items-center -mt-24 space-y-6 relative z-10">
        <div class="relative group">
          <img :src="creator.avatar" :alt="creator.name" class="size-36 rounded-full object-cover border-8 border-white shadow-xl" />
        </div>
        
        <div class="text-center space-y-4 w-full">
          <div class="flex items-center justify-center gap-2 relative">
            <h2 class="text-4xl font-extrabold text-[#090618]">{{ creator.name }}</h2>
            <div class="absolute right-0 top-1/2 -translate-y-1/2 flex gap-4">
               <button class="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1.5 text-gray-400">
                <MoreHorizontal class="size-6" />
              </button>
              <div class="bg-white rounded-xl shadow-lg border p-1 hidden group-hover:block">
                 <button class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Info class="size-4" />
                    Report
                 </button>
              </div>
              <button class="flex items-center gap-2 bg-white border px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <Info class="size-5 text-gray-400" />
                <span class="font-bold text-gray-700">Report</span>
              </button>
            </div>
          </div>
          <p class="text-gray-500 font-medium text-lg">{{ creator.description }}</p>
        </div>
      </div>
    </div>

    <!-- Storefront Section -->
    <main class="w-full max-w-7xl mx-auto px-6 pb-24 space-y-12">
      <h3 class="text-center font-bold text-gray-900 text-lg">Shop {{ creator.name }}'s Storefront</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in products" :key="product.id" class="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-transparent hover:border-gray-100">
          <!-- Product Image Carousel Mock -->
          <div class="relative aspect-[4/5] overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
            
            <!-- Navigation -->
            <button class="absolute left-4 top-1/2 -translate-y-1/2 size-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft class="size-5" />
            </button>
            <button class="absolute right-4 top-1/2 -translate-y-1/2 size-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight class="size-5" />
            </button>
            
            <!-- Indicator -->
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              <div class="size-1.5 rounded-full bg-white"></div>
              <div v-for="i in 3" :key="i" class="size-1.5 rounded-full bg-white/40"></div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-8 space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>{{ product.brand }}</span>
                <span v-if="product.comments > 0" class="flex items-center gap-1">
                  <MessageCircle class="size-4" />
                  {{ product.comments }}
                </span>
                <MessageCircle v-else class="size-4" />
              </div>
              <h4 class="text-xl font-bold text-gray-900 leading-tight">{{ product.name }}</h4>
              <p class="text-sm text-gray-500 leading-relaxed line-clamp-2">{{ product.description }}</p>
            </div>

            <div class="flex justify-between items-center pt-2">
              <span class="text-2xl font-black text-gray-900">${{ product.price }}</span>
              <Button class="bg-[#5a42f5] hover:bg-[#4a32e5] text-white px-6 py-6 rounded-xl font-bold flex items-center gap-2 group/btn">
                Shop Now
                <ExternalLink class="size-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

:deep(*) {
  font-family: 'Inter', sans-serif;
}
</style>
