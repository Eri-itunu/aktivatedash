<script setup lang="ts">
import { ArrowLeft, Tag, Package, BarChart2, ImageOff } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import type { IProduct } from 'types';
import { getProductBySlug, updateProductStatus } from '@/api/brand/product.brand';
import { useToast } from '@/components/ui/toast/use-toast';

definePageMeta({
  layout: 'light',
});

const route = useRoute();
const router = useRouter();
const { toast } = useToast();
const userStore = useUserStore();
const config = useRuntimeConfig();

const product = ref<IProduct | null>(null);
const loading = ref(false);
const updatingStatus = ref(false);

const fetchProduct = async () => {
  loading.value = true;
  try {
    product.value = await getProductBySlug({
      accessToken: userStore.accessToken as string,
      apiUrl: config.public.API_URL as string,
      slugOrId: route.params.slug as string,
    });
  } catch (err: any) {
    toast({ title: err.message, variant: 'destructive' });
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProduct);

const formatPrice = (price: number, currency = 'NGN') =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(price);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });

const statusClasses: Record<string, string> = {
  live: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
  paused: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400',
  draft: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400',
};

const handleToggleStatus = async () => {
  if (!product.value || product.value.status === 'draft') return;
  const newStatus: 'live' | 'paused' = product.value.status === 'live' ? 'paused' : 'live';
  updatingStatus.value = true;
  try {
    await updateProductStatus({
      accessToken: userStore.accessToken as string,
      apiUrl: config.public.API_URL as string,
      productId: product.value.id,
      status: newStatus,
    });
    product.value.status = newStatus;
    toast({ title: `Product ${newStatus === 'live' ? 'is now live' : 'paused'}.` });
  } catch (err: any) {
    toast({ title: err.message, variant: 'destructive' });
  } finally {
    updatingStatus.value = false;
  }
};
</script>

<template>
  <div class="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-gray-50 dark:bg-[#090618]/30">

    <!-- HEADER -->
    <div class="flex items-center gap-4 px-6 py-4 shrink-0">
      <button @click="router.back()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors -ml-2">
        <ArrowLeft class="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
      <div class="flex-1 min-w-0">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white leading-tight truncate">
          {{ product?.name ?? 'Product Details' }}
        </h1>
        <p v-if="product" class="text-sm text-gray-500">{{ product.slug }}</p>
      </div>
      <Button
        v-if="product && product.status !== 'draft'"
        @click="handleToggleStatus"
        :disabled="updatingStatus"
        :class="product.status === 'live'
          ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
          : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'"
        variant="outline"
        class="shrink-0 transition-colors"
      >
        <span v-if="updatingStatus">Updating...</span>
        <span v-else>{{ product.status === 'live' ? 'Pause Product' : 'Go Live' }}</span>
      </Button>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="w-10 h-10 border-4 border-purple1 border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- CONTENT -->
    <div v-else-if="product" class="flex-1 overflow-y-auto px-6 pb-10">
      <div class="max-w-4xl space-y-6">

        <!-- IMAGE GALLERY -->
        <div class="bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div class="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <img
              v-if="product.images?.length"
              :src="product.images[0]"
              :alt="product.name"
              class="w-full h-full object-contain"
            />
            <div v-else class="flex flex-col items-center gap-2 text-gray-400">
              <ImageOff class="w-12 h-12" />
              <span class="text-sm">No image available</span>
            </div>
          </div>
          <div v-if="product.images?.length > 1" class="flex gap-3 p-4 overflow-x-auto">
            <img
              v-for="(img, i) in product.images"
              :key="i"
              :src="img"
              :alt="`${product.name} image ${i + 1}`"
              class="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700 shrink-0"
            />
          </div>
        </div>

        <!-- OVERVIEW GRID -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 flex items-center gap-4">
            <div class="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <Tag class="w-5 h-5 text-purple1" />
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-0.5">Retail Price</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ formatPrice(product.retailPrice, product.currency) }}</p>
            </div>
          </div>
          <div class="bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 flex items-center gap-4">
            <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Package class="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-0.5">Quantity</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ product.quantity }}</p>
            </div>
          </div>
          <div class="bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 flex items-center gap-4">
            <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
              <BarChart2 class="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-0.5">Commission</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white">
                {{ product.commissionStructure === 'percentage' ? `${product.commissionPercentage}%` : formatPrice(product.commissionPrice, product.currency) }}
              </p>
            </div>
          </div>
        </div>

        <!-- DETAILS CARD -->
        <div class="bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-6">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Product Details</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Name</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ product.name }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Category</p>
              <p class="text-sm text-gray-900 dark:text-white capitalize">{{ product.tags?.[0] ?? '—' }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status</p>
              <span :class="statusClasses[product.status] ?? 'text-gray-600 bg-gray-100'" class="px-2 py-1 rounded-full text-xs font-semibold capitalize">
                {{ product.status }}
              </span>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Currency</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ product.currency }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Commission Structure</p>
              <p class="text-sm text-gray-900 dark:text-white capitalize">{{ product.commissionStructure }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Date Created</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ formatDate(product.createdAt) }}</p>
            </div>
          </div>

          <div v-if="product.description">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Description</p>
            <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ product.description }}</p>
          </div>

          <div v-if="product.tags?.length">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Tags</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in product.tags" :key="tag" class="px-3 py-1 rounded-full text-xs bg-purple-50 dark:bg-purple-900/20 text-purple1 font-medium">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- NOT FOUND -->
    <div v-else class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <p class="text-gray-500 mb-4">Product not found.</p>
        <button @click="router.back()" class="text-purple1 hover:underline text-sm font-medium">Go back</button>
      </div>
    </div>

  </div>
</template>
