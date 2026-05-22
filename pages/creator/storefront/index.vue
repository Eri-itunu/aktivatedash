<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Share2,
  MoreHorizontal,
  Info,
  ExternalLink,
  ImageOff,
  ShoppingBag,
} from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import type { IProduct } from 'types'
import { getCreatorStorefrontProducts } from '@/api/creator/product.creator'

import { useToast } from "@/components/ui/toast/use-toast"

definePageMeta({
  layout: false,
})

const { toast } = useToast()
const userStore = useUserStore()
const config = useRuntimeConfig()

// --- CREATOR PROFILE ---
const profile = computed(() => userStore.userProfile)
const creatorName = computed(() => profile.value?.fullName || profile.value?.firstName || 'Creator')
const creatorAvatar = computed(() => profile.value?.imgUrl || null)
const creatorBio = computed(() => profile.value?.bio || 'My recommendations — products I love and use every day')

// --- PRODUCTS ---
const products = ref<IProduct[]>([])
const loading = ref(false)
// Track active image index per product
const activeImageIndex = ref<Record<string, number>>({})

const fetchProducts = async () => {
  loading.value = true
  try {
    const { data: entries } = await getCreatorStorefrontProducts({
      accessToken: userStore.accessToken as string,
      apiUrl: config.public.API_URL as string,
    })
    products.value = entries.map(e => e.product)
    products.value.forEach(p => { activeImageIndex.value[p.id] = 0 })
  } catch (err: any) {
    toast({ title: err.message, variant: 'destructive' })
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)

const prevImage = (product: IProduct) => {
  const len = product.images?.length || 1
  activeImageIndex.value[product.id] = (activeImageIndex.value[product.id] - 1 + len) % len
}

const nextImage = (product: IProduct) => {
  const len = product.images?.length || 1
  activeImageIndex.value[product.id] = (activeImageIndex.value[product.id] + 1) % len
}

const currentImage = (product: IProduct): string | null => {
  const idx = activeImageIndex.value[product.id] ?? 0
  return product.images?.[idx] ?? null
}

const formatPrice = (price: number, currency = 'NGN') =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(price)

const commissionLabel = (p: IProduct) =>
  p.commissionStructure === 'percentage'
    ? `${p.commissionPercentage}% commission`
    : `${formatPrice(p.commissionPrice, p.currency)} commission`

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  toast({ title: 'Link copied to clipboard' })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar -->
    <!-- <nav class="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center gap-2">
        <img src="/icons/AktivateLogo.svg" alt="Aktivate" class="h-6" />
        <span class="text-xs text-gray-400 font-medium">Join aktivate and apply to campaigns!</span>
      </div>
      <Button class="bg-[#5a42f5] hover:bg-[#4a32e5] text-white px-6 py-2 rounded-lg font-bold text-sm uppercase">
        Sign Up
      </Button>
    </nav> -->

    <!-- Header -->
    <div class="w-full max-w-6xl mx-auto px-6 pt-10 pb-16 space-y-8">
      <!-- Cover Image -->
      <div class="h-48 md:h-64 rounded-[2rem] overflow-hidden relative shadow-lg bg-gradient-to-br from-purple-400 to-indigo-600">
        <img src="/images/storefront_cover.png" class="w-full h-full object-cover" alt="Cover" />
      </div>

      <!-- Profile -->
      <div class="flex flex-col items-center -mt-24 space-y-6 relative z-10">
        <!-- Avatar -->
        <div class="size-36 rounded-full overflow-hidden border-8 border-white shadow-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shrink-0">
          <img v-if="creatorAvatar" :src="creatorAvatar" :alt="creatorName" class="size-36 object-cover" />
          <span v-else class="text-4xl font-black text-white">{{ creatorName.charAt(0) }}</span>
        </div>

        <div class="text-center space-y-4 w-full">
          <div class="flex items-center justify-center gap-2 relative">
            <h2 class="text-4xl font-extrabold text-[#090618]">{{ creatorName }}</h2>
            <div class="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
              <button @click="copyLink" class="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <Share2 class="size-4 text-gray-500" />
                <span class="font-bold text-gray-700 text-sm">Share</span>
              </button>
            </div>
          </div>
          <p class="text-gray-500 font-medium text-lg">{{ creatorBio }}</p>
        </div>
      </div>
    </div>

    <!-- Storefront -->
    <main class="w-full max-w-7xl mx-auto px-6 pb-24 space-y-12">
      <h3 class="text-center font-bold text-gray-900 text-lg">Shop {{ creatorName }}'s Storefront</h3>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-[#5a42f5] border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Empty -->
      <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="p-5 bg-purple-50 rounded-full mb-4">
          <ShoppingBag class="w-10 h-10 text-[#5a42f5]" />
        </div>
        <h4 class="text-xl font-bold text-gray-900 mb-2">No products yet</h4>
        <p class="text-gray-500 max-w-sm">{{ creatorName }} hasn't added any products to their storefront yet. Check back soon!</p>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-transparent hover:border-gray-100"
        >
          <!-- Image Carousel -->
          <div class="relative aspect-[4/5] overflow-hidden bg-gray-100">
            <img
              v-if="currentImage(product)"
              :src="currentImage(product)!"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <img src="/images/default-product.svg" alt="Default Product Image" />
            </div>

            <!-- Prev / Next — only when multiple images -->
            <template v-if="(product.images?.length ?? 0) > 1">
              <button
                @click="prevImage(product)"
                class="absolute left-4 top-1/2 -translate-y-1/2 size-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft class="size-5" />
              </button>
              <button
                @click="nextImage(product)"
                class="absolute right-4 top-1/2 -translate-y-1/2 size-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight class="size-5" />
              </button>

              <!-- Dots -->
              <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                <div
                  v-for="(_, i) in product.images"
                  :key="i"
                  class="size-1.5 rounded-full transition-colors"
                  :class="activeImageIndex[product.id] === i ? 'bg-white' : 'bg-white/40'"
                />
              </div>
            </template>
          </div>

          <!-- Product Info -->
          <div class="p-8 space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>{{ product.tags?.[0] ?? 'Product' }}</span>
                <MessageCircle class="size-4" />
              </div>
              <h4 class="text-xl font-bold text-gray-900 leading-tight">{{ product.name }}</h4>
              <p v-if="product.description" class="text-sm text-gray-500 leading-relaxed line-clamp-2">{{ product.description }}</p>
            </div>

            <div class="flex justify-between items-center pt-2">
              <span class="text-2xl font-black text-gray-900">{{ formatPrice(product.retailPrice, product.currency) }}</span>
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
:deep(*) { font-family: 'Inter', sans-serif; }
</style>
