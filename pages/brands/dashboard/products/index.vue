<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AppEmptyState from '@/components/shared/AppEmptyState.vue';
import ReusableTable from '@/components/shared/ReusableTable.vue';
import StatsCard from '@/components/shared/StatsCard.vue';
import { useBrandProducts } from '@/composables/useBrandProducts';

definePageMeta({
  layout: "light",
});

const activeTab = ref('all');
const productTabs = ['all', 'live', 'paused'];

const { products, meta, loading, updatingId, fetchProducts, nextPage, previousPage, page, toggleStatus } = useBrandProducts();

onMounted(() => fetchProducts());

const productColumns = [
  { key: 'name', label: 'Product Name', class: 'font-medium text-gray-900 dark:text-white' },
  { key: 'status', label: 'Status' },
  { key: 'retailPrice', label: 'Price' },
  { key: 'createdAt', label: 'Date Created', hideOnMobile: true },
  { key: 'actions', label: 'Actions' },
];

const analyticsProductColumns = [
  { key: 'name', label: 'Product Name', class: 'font-medium text-gray-900 dark:text-white' },
  { key: 'retailPrice', label: 'Price' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'status', label: 'Status' },
];

const filteredProducts = computed(() => {
  if (activeTab.value === 'all') return products.value;
  if (activeTab.value === 'live') return products.value.filter(p => p.status === 'live');
  if (activeTab.value === 'paused') return products.value.filter(p => p.status === 'paused');
  if (activeTab.value === 'draft') return products.value.filter(p => p.status === 'draft');
  return [];
});

const liveProductCount = computed(() => products.value.filter(p => p.status === 'live').length);
const pausedProductCount = computed(() => products.value.filter(p => p.status === 'paused').length);
const totalInventoryValue = computed(() =>
  products.value.reduce((sum, product) => sum + (product.retailPrice * product.quantity), 0)
);
const topProducts = computed(() =>
  [...products.value]
    .sort((a, b) => (b.retailPrice * b.quantity) - (a.retailPrice * a.quantity))
    .slice(0, 5)
);

const formatPrice = (price: number, currency = 'NGN') =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(price);

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });

const handleAddProduct = () => navigateTo('/brands/dashboard/products/create');
const handleView = (row: any) => navigateTo(`/brands/dashboard/products/${row.slug}`);
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Products</h1>
      <Button v-if="activeTab !== 'analytics'" @click="navigateTo('/brands/dashboard/products/create')" class="bg-purple1 hover:bg-purple1/90 text-white">
        + Add New Product
      </Button>
    </div>

    <Tabs v-model="activeTab" default-value="all" class="w-full">
      <TabsList class="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent mb-6 overflow-x-auto">
        <TabsTrigger
          v-for="tab in [...productTabs, 'analytics']"
          :key="tab"
          :value="tab"
          class="rounded-none border-b-2 border-transparent data-[state=active]:border-purple1 data-[state=active]:text-purple1 px-4 py-2 capitalize bg-transparent whitespace-nowrap"
        >
          {{ tab }}
        </TabsTrigger>
      </TabsList>

      <!-- PRODUCT LIST TABS -->
      <TabsContent v-for="tab in productTabs" :key="tab" :value="tab" class="mt-0">
        <div v-if="loading" class="flex items-center justify-center py-16">
          <div class="w-8 h-8 border-4 border-purple1 border-t-transparent rounded-full animate-spin" />
        </div>

        <div v-else-if="filteredProducts.length > 0" class="space-y-4">
          <ReusableTable :columns="productColumns" :data="filteredProducts">
            <template #status="{ row }">
              <span :class="{
                'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400': row.status === 'live',
                'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400': row.status === 'paused',
                'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400': row.status === 'draft'
              }" class="px-2 py-1 rounded-full text-xs font-semibold capitalize">
                {{ row.status }}
              </span>
            </template>
            <template #retailPrice="{ row }">
              {{ formatPrice(row.retailPrice, row.currency) }}
            </template>
            <template #createdAt="{ row }">
              {{ formatDate(row.createdAt) }}
            </template>
            <template #actions="{ row }">
              <div class="flex items-center gap-3">
                <button @click="handleView(row)" class="text-purple1 hover:underline text-sm font-medium">View</button>
                <button
                  v-if="row.status !== 'draft'"
                  @click="toggleStatus(row.id, row.status)"
                  :disabled="updatingId === row.id"
                  :class="row.status === 'live'
                    ? 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300'
                    : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'"
                  class="text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span v-if="updatingId === row.id">...</span>
                  <span v-else>{{ row.status === 'live' ? 'Pause' : 'Go Live' }}</span>
                </button>
              </div>
            </template>
          </ReusableTable>

          <!-- Pagination -->
          <div v-if="meta && meta.lastPage > 1" class="flex items-center justify-between pt-2">
            <p class="text-sm text-gray-500">Page {{ meta.currentPage }} of {{ meta.lastPage }}</p>
            <div class="flex gap-2">
              <Button variant="outline" size="sm" :disabled="page <= 1 || loading" @click="previousPage">Previous</Button>
              <Button variant="outline" size="sm" :disabled="!meta || page >= meta.lastPage || loading" @click="nextPage">Next</Button>
            </div>
          </div>
        </div>

        <AppEmptyState
          v-else
          :title="`No ${tab === 'all' ? '' : tab} products`"
          :description="`You don't have any ${tab === 'all' ? '' : tab} products currently.`"
          action-label="Create Product"
          @action="handleAddProduct"
        />
      </TabsContent>

      <!-- ANALYTICS TAB -->
      <TabsContent value="analytics" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard label="Products Listed" :value="products.length" />
          <StatsCard label="Live Products" :value="liveProductCount" />
          <StatsCard label="Paused Products" :value="pausedProductCount" />
          <StatsCard label="Inventory Value" :value="formatPrice(totalInventoryValue)" />
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Products by Inventory Value</h3>
          <ReusableTable :columns="analyticsProductColumns" :data="topProducts">
            <template #retailPrice="{ row }">
              {{ formatPrice(row.retailPrice, row.currency) }}
            </template>
            <template #status="{ row }">
              <span :class="{
                'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400': row.status === 'live',
                'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400': row.status === 'paused',
                'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400': row.status === 'draft'
              }" class="px-2 py-1 rounded-full text-xs font-semibold capitalize">
                {{ row.status }}
              </span>
            </template>
          </ReusableTable>
          <div v-if="!loading && topProducts.length === 0" class="py-12">
            <AppEmptyState
              title="No product data"
              description="Create products to see analytics here."
              action-label="Create Product"
              @action="handleAddProduct"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
