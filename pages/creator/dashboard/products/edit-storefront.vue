<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronLeft, Trash2, ImageOff } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import type { IProduct } from 'types'
import { getCreatorStorefrontProducts } from '@/api/creator/product.creator'
import { useToast } from "@/components/ui/toast/use-toast"

definePageMeta({
  layout: "dashboard",
})

const router = useRouter()
const { toast } = useToast()
const userStore = useUserStore()
const config = useRuntimeConfig()

const loading = ref(false)
const products = ref<(IProduct & { caption: string })[]>([])

const fetchStorefrontProducts = async () => {
  loading.value = true
  try {
    const data = await getCreatorStorefrontProducts({
      accessToken: userStore.accessToken as string,
      apiUrl: config.public.API_URL as string,
    })
    products.value = data.storeFrontProducts.data.map(p => ({ ...p, caption: '' }))
  } catch (err: any) {
    toast({ title: err.message, variant: 'destructive' })
  } finally {
    loading.value = false
  }
}

onMounted(fetchStorefrontProducts)

const removeProduct = (id: string) => {
  products.value = products.value.filter(p => p.id !== id)
  toast({ title: 'Product removed from storefront.' })
}

const formatPrice = (price: number, currency = 'NGN') =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(price)

const commissionLabel = (p: IProduct) =>
  p.commissionStructure === 'percentage'
    ? `${p.commissionPercentage}% commission`
    : `${formatPrice(p.commissionPrice, p.currency)} commission`
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-12 pb-20">
    <!-- Header -->
    <div class="space-y-8">
      <div class="flex items-center gap-4">
        <button @click="router.push('/creator/dashboard/products')" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <ChevronLeft class="size-6 text-gray-900 dark:text-white" />
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Storefront</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">Manage products in your ShopLink</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-10 h-10 border-4 border-purplebg border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Empty -->
    <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
      <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-4">
        <ImageOff class="w-8 h-8 text-purplebg" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Your storefront is empty</h3>
      <p class="text-sm text-gray-500 mb-4">Add products from the marketplace to get started.</p>
      <Button @click="router.push('/creator/dashboard/products')" class="bg-purplebg text-white">Browse Marketplace</Button>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white dark:bg-[#090618] rounded-2xl border dark:border-gray-800 p-6 shadow-sm space-y-4"
      >
        <div class="flex justify-between items-start">
          <div class="flex gap-4">
            <!-- Thumbnail -->
            <div class="size-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
              <img
                v-if="product.images?.length"
                :src="product.images[0]"
                :alt="product.name"
                class="size-20 object-cover"
              />
              <div v-else class="size-20 flex items-center justify-center">
                <ImageOff class="w-6 h-6 text-gray-400" />
              </div>
            </div>

            <div class="space-y-1 mt-1 min-w-0">
              <h3 class="font-bold text-gray-900 dark:text-white leading-tight truncate">{{ product.name }}</h3>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tag in product.tags?.slice(0, 2)"
                  :key="tag"
                  class="text-[10px] font-bold text-gray-400 uppercase tracking-wider"
                >#{{ tag }}</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {{ formatPrice(product.retailPrice, product.currency) }} • {{ commissionLabel(product) }}
              </p>
            </div>
          </div>

          <button
            @click="removeProduct(product.id)"
            class="p-2.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100 transition-colors shrink-0"
          >
            <Trash2 class="size-5" />
          </button>
        </div>

        <!-- Caption -->
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase tracking-widest">Caption (Optional)</label>
          <textarea
            v-model="product.caption"
            placeholder="Why do you love this product? How do you use it? Share it with your followers"
            class="w-full h-24 bg-gray-50 dark:bg-white/5 border dark:border-gray-800 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  </div>
</template>
