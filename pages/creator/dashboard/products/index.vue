<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from "@/components/ui/toast/use-toast"
import { Button } from "@/components/ui/button"
import { ExternalLink, Edit2, ImageOff, X, Package } from "lucide-vue-next"
import type { IProduct } from 'types'
import {
  getAvailableStorefrontProducts,
  getCreatorStorefrontProducts,
  addProductToStorefront,
  getCreatorProduct,
} from '@/api/creator/product.creator'


definePageMeta({
  layout: "dashboard",
})

import ProductAnalytics from "@/components/creator/ProductAnalytics.vue"
import ProductWallet from "@/components/creator/ProductWallet.vue"

const { toast } = useToast()
const userStore = useUserStore()
const config = useRuntimeConfig()
const accessToken = userStore.accessToken as string
const apiUrl = config.public.API_URL as string

const activeTab = ref('brand-partners')

// --- DATA ---
const products = ref<IProduct[]>([])
const storefrontIds = ref<Set<string>>(new Set())
const loadingProducts = ref(false)
const addingId = ref<string | null>(null)

// --- DETAIL MODAL ---
const selectedProduct = ref<IProduct | null>(null)
const loadingDetail = ref(false)
const showModal = ref(false)

const isInStorefront = (product: IProduct) => storefrontIds.value.has(product.id)

const fetchProducts = async () => {
  loadingProducts.value = true
  try {
    const [available, { data: storefrontEntries }] = await Promise.all([
      getAvailableStorefrontProducts({ accessToken, apiUrl }),
      getCreatorStorefrontProducts({ accessToken, apiUrl }),
    ])
    products.value = available
    storefrontIds.value = new Set(storefrontEntries.map(e => e.productId))
  } catch (err: any) {
    toast({ title: err.message, variant: 'destructive' })
  } finally {
    loadingProducts.value = false
  }
}

const openDetail = async (product: IProduct) => {
  showModal.value = true
  loadingDetail.value = true
  selectedProduct.value = product
  try {
    selectedProduct.value = await getCreatorProduct({ accessToken, apiUrl, slugOrId: product.slug || product.id })
  } catch {
    // Keep the card data if detail fetch fails
  } finally {
    loadingDetail.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

const handleAddToShopLink = async (product: IProduct) => {
  addingId.value = product.id
  try {
    await addProductToStorefront({ accessToken, apiUrl, productId: product.id })
    storefrontIds.value.add(product.id)
    toast({
      title: "Added to ShopLink!",
      description: `${product.name} is now live on your storefront.`,
    })
    if (showModal.value && selectedProduct.value?.id === product.id) closeModal()
  } catch (err: any) {
    toast({ title: err.message, variant: 'destructive' })
  } finally {
    addingId.value = null
  }
}

const formatPrice = (price: number, currency = 'NGN') =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(price)

const commissionLabel = (p: IProduct) =>
  p.commissionStructure === 'percentage'
    ? `${p.commissionPercentage}%`
    : formatPrice(p.commissionPrice, p.currency)

onMounted(fetchProducts)
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="space-y-1">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Product Marketplace</h1>
        <p class="text-gray-500 dark:text-gray-400">Browse and add products to your storefront from partnered brands</p>
      </div>
      <div class="flex gap-3">
        <NuxtLink to="/creator/dashboard/products/edit-storefront">
          <Button variant="outline" class="flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white">
            <Edit2 class="size-4" />
            Edit Storefront
          </Button>
        </NuxtLink>
        <NuxtLink to="/creator/storefront" target="_blank">
          <Button variant="outline" class="flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white">
            <ExternalLink class="size-4" />
            View Storefront
          </Button>
        </NuxtLink>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-8 border-b dark:border-gray-800">
      <button
        v-for="tab in ['Brand partners']"
        :key="tab"
        @click="activeTab = tab.toLowerCase().replace(' ', '-')"
        class="pb-4 text-sm font-medium transition-colors relative"
        :class="activeTab === tab.toLowerCase().replace(' ', '-') ? 'text-purplebg' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
      >
        {{ tab }}
        <div v-if="activeTab === tab.toLowerCase().replace(' ', '-')" class="absolute bottom-0 left-0 w-full h-0.5 bg-purplebg rounded-full" />
      </button>
    </div>

    <!-- Brand Partners Tab -->
    <div v-show="activeTab === 'brand-partners'">

      <!-- Loading -->
      <div v-if="loadingProducts" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-purplebg border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Empty -->
      <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-4">
          <Package class="w-8 h-8 text-purplebg" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">No products available</h3>
        <p class="text-sm text-gray-500">There are no products available for your storefront yet.</p>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white dark:bg-[#090618] rounded-2xl overflow-hidden border dark:border-gray-800 shadow-sm transition-transform hover:scale-[1.01]"
        >
          <!-- Image -->
          <div class="relative h-56 overflow-hidden cursor-pointer" @click="openDetail(product)">
            <img
              v-if="product.images?.length"
              :src="product.images[0]"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <img src="/images/smart_watch.png" alt="Default Product Image" />
            </div>
            <div v-if="isInStorefront(product)" class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <span class="text-[10px] font-bold text-purplebg uppercase tracking-wider">In ShopLink</span>
            </div>
          </div>

          <div class="p-5 space-y-4">
            <div class="cursor-pointer" @click="openDetail(product)">
              <h3 class="font-bold text-lg text-gray-900 dark:text-white leading-tight">{{ product.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{{ product.description }}</p>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-gray-900 dark:text-white">{{ formatPrice(product.retailPrice, product.currency) }}</span>
              <div class="bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs font-bold text-green-600 dark:text-green-400">
                {{ commissionLabel(product) }}
              </div>
            </div>

            <Button
              v-if="!isInStorefront(product)"
              @click="handleAddToShopLink(product)"
              :disabled="addingId === product.id"
              class="w-full bg-purplebg hover:bg-purplebg/90 text-white font-semibold py-6 rounded-xl disabled:opacity-60"
            >
              {{ addingId === product.id ? 'Adding...' : 'Add to ShopLink' }}
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
    </div>

    <ProductAnalytics v-if="activeTab === 'analytics'" />
    <ProductWallet v-if="activeTab === 'wallet'" />

    <!-- PRODUCT DETAIL MODAL -->
    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="bg-white dark:bg-[#0f0d1f] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800 shrink-0">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white truncate pr-4">{{ selectedProduct?.name }}</h2>
            <button @click="closeModal" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0">
              <X class="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="overflow-y-auto flex-1">
            <div v-if="loadingDetail" class="flex items-center justify-center py-12">
              <div class="w-8 h-8 border-4 border-purplebg border-t-transparent rounded-full animate-spin" />
            </div>

            <div v-else-if="selectedProduct" class="space-y-0">
              <!-- Image -->
              <div class="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <img
                  v-if="selectedProduct.images?.length"
                  :src="selectedProduct.images[0]"
                  :alt="selectedProduct.name"
                  class="w-full h-full object-contain"
                />
                <ImageOff v-else class="w-12 h-12 text-gray-300" />
              </div>

              <div class="p-6 space-y-5">
                <!-- Stats row -->
                <div class="grid grid-cols-3 gap-3">
                  <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
                    <p class="text-xs text-gray-500 mb-1">Price</p>
                    <p class="text-sm font-bold text-gray-900 dark:text-white">{{ formatPrice(selectedProduct.retailPrice, selectedProduct.currency) }}</p>
                  </div>
                  <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                    <p class="text-xs text-gray-500 mb-1">Commission</p>
                    <p class="text-sm font-bold text-green-600 dark:text-green-400">{{ commissionLabel(selectedProduct) }}</p>
                  </div>
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
                    <p class="text-xs text-gray-500 mb-1">Stock</p>
                    <p class="text-sm font-bold text-gray-900 dark:text-white">{{ selectedProduct.quantity }}</p>
                  </div>
                </div>

                <!-- Description -->
                <div v-if="selectedProduct.description">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{{ selectedProduct.description }}</p>
                </div>

                <!-- Tags -->
                <div v-if="selectedProduct.tags?.length">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tags</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in selectedProduct.tags" :key="tag" class="px-3 py-1 rounded-full text-xs bg-purple-50 dark:bg-purple-900/20 text-purplebg font-medium">{{ tag }}</span>
                  </div>
                </div>

                <!-- CTA -->
                <Button
                  v-if="!isInStorefront(selectedProduct)"
                  @click="handleAddToShopLink(selectedProduct)"
                  :disabled="addingId === selectedProduct.id"
                  class="w-full bg-purplebg hover:bg-purplebg/90 text-white font-semibold py-6 rounded-xl disabled:opacity-60"
                >
                  {{ addingId === selectedProduct.id ? 'Adding...' : 'Add to ShopLink' }}
                </Button>
                <Button v-else disabled class="w-full bg-gray-50 dark:bg-gray-800/50 text-gray-400 border dark:border-gray-700 py-6 rounded-xl">
                  Already in ShopLink
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
