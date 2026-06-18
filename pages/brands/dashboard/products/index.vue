<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppEmptyState from '@/components/shared/AppEmptyState.vue';
import ReusableTable from '@/components/shared/ReusableTable.vue';
import StatsCard from '@/components/shared/StatsCard.vue';
import { useBrandProducts } from '@/composables/useBrandProducts';

definePageMeta({
  layout: "light",
});

const activeTab = ref('all');
const isPayoutDialogOpen = ref(false);
const isAddMethodDialogOpen = ref(false);
const payoutAmount = ref('');
const payoutMethod = ref<any>(null);

const { products, meta, loading, updatingId, fetchProducts, nextPage, previousPage, page, toggleStatus } = useBrandProducts();

onMounted(() => fetchProducts());

const topProducts = ref([
  { id: 1, name: 'Premium Wireless Headphones', revenue: '₦15,450', sales: 52, status: 'Live' },
  { id: 5, name: '4K Ultra HD Monitor', revenue: '₦12,300', sales: 31, status: 'Live' },
  { id: 2, name: 'Ergonomic Office Chair', revenue: '₦9,450', sales: 21, status: 'Paused' },
]);
const topCreators = ref([
  { id: 1, name: 'Sarah Johnson', revenue: '₦450,200', sales: 145 },
  { id: 2, name: 'Mike Chen', revenue: '₦303,800', sales: 98 },
  { id: 3, name: 'Emma Wilson', revenue: '₦201,000', sales: 67 },
]);

const walletBalance = 955000.50;
const payoutHistory = ref([
  { id: 'REF-001', date: '2025-01-01', amount: '₦1,500.00', status: 'Completed' },
  { id: 'REF-002', date: '2024-12-15', amount: '₦2,300.00', status: 'Completed' },
  { id: 'REF-003', date: '2024-11-30', amount: '₦850.00', status: 'Processed' },
]);

const productColumns = [
  { key: 'name', label: 'Product Name', class: 'font-medium text-gray-900 dark:text-white' },
  { key: 'status', label: 'Status' },
  { key: 'retailPrice', label: 'Price' },
  { key: 'createdAt', label: 'Date Created', hideOnMobile: true },
  { key: 'actions', label: 'Actions' },
];

const analyticsProductColumns = [
  { key: 'name', label: 'Product Name', class: 'font-medium text-gray-900 dark:text-white' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'sales', label: 'Sales' },
  { key: 'status', label: 'Status' },
];

const analyticsCreatorColumns = [
  { key: 'name', label: 'Creator', class: 'font-medium text-gray-900 dark:text-white' },
  { key: 'revenue', label: 'Revenue Generated' },
  { key: 'sales', label: 'Total Sales' },
];

const payoutHistoryColumns = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount', class: 'font-medium' },
  { key: 'status', label: 'Status' },
  { key: 'id', label: 'Reference ID', hideOnMobile: true },
];

const filteredProducts = computed(() => {
  if (activeTab.value === 'all') return products.value;
  if (activeTab.value === 'live') return products.value.filter(p => p.status === 'live');
  if (activeTab.value === 'paused') return products.value.filter(p => p.status === 'paused');
  if (activeTab.value === 'draft') return products.value.filter(p => p.status === 'draft');
  return [];
});

const formattedBalance = computed(() =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(walletBalance)
);

const formatPrice = (price: number, currency = 'NGN') =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(price);

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });

const handleAddProduct = () => navigateTo('/brands/dashboard/products/create');
const handleView = (row: any) => navigateTo(`/brands/dashboard/products/${row.slug}`);
const handleRequestPayout = () => { isPayoutDialogOpen.value = true; };
const submitPayout = () => {
  isPayoutDialogOpen.value = false;
  payoutAmount.value = '';
};
const addPayoutMethod = () => { isAddMethodDialogOpen.value = true; };
const savePayoutMethod = () => {
  payoutMethod.value = { bankName: 'Chase Bank', accountNumber: '•••• 1234', holderName: 'Aktivate Brand Inc.' };
  isAddMethodDialogOpen.value = false;
};
const deletePayoutMethod = () => { payoutMethod.value = null; };
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Products</h1>
      <Button v-if="!['analytics', 'payout'].includes(activeTab)" @click="navigateTo('/brands/dashboard/products/create')" class="bg-purple1 hover:bg-purple1/90 text-white">
        + Add New Product
      </Button>
    </div>

    <Tabs v-model="activeTab" default-value="all" class="w-full">
      <TabsList class="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent mb-6 overflow-x-auto">
        <TabsTrigger
          v-for="tab in ['all', 'live', 'paused', 'analytics', 'payout']"
          :key="tab"
          :value="tab"
          class="rounded-none border-b-2 border-transparent data-[state=active]:border-purple1 data-[state=active]:text-purple1 px-4 py-2 capitalize bg-transparent whitespace-nowrap"
        >
          {{ tab }}
        </TabsTrigger>
      </TabsList>

      <!-- PRODUCT LIST TABS -->
      <TabsContent v-for="tab in ['all', 'live', 'paused', 'draft']" :key="tab" :value="tab" class="mt-0">
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
          <StatsCard label="Total Revenue" :value="formattedBalance" />
          <StatsCard label="Products Listed" :value="products.length" />
          <StatsCard label="Total Sales" value="1,234" />
          <StatsCard label="Active Creators" value="45" />
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Top Performing Products</h3>
          <ReusableTable :columns="analyticsProductColumns" :data="topProducts">
            <template #status="{ row }">
              <span class="text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                {{ row.status }}
              </span>
            </template>
          </ReusableTable>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Top Performing Creators</h3>
          <ReusableTable :columns="analyticsCreatorColumns" :data="topCreators">
            <template #name="{ row }">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                  {{ row.name.charAt(0) }}
                </div>
                <span>{{ row.name }}</span>
              </div>
            </template>
          </ReusableTable>
        </div>
      </TabsContent>

      <!-- PAYOUT TAB -->
      <TabsContent value="payout" class="space-y-8">
        <div class="relative overflow-hidden rounded-2xl p-8 text-white shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600">
          <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p class="text-purple-100 font-medium mb-1">Total Wallet Balance</p>
              <h2 class="text-4xl font-bold tracking-tight">{{ formattedBalance }}</h2>
            </div>
            <Button @click="handleRequestPayout" class="bg-white text-purple-600 hover:bg-gray-100 font-semibold border-none">
              Request Payout
            </Button>
          </div>
          <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div class="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Payout Method</h3>
          <div v-if="payoutMethod" class="p-6 bg-white dark:bg-vDarkBlue rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <span class="text-lg">🏦</span>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">{{ payoutMethod.bankName }}</p>
                <p class="text-sm text-gray-500">{{ payoutMethod.accountNumber }} • {{ payoutMethod.holderName }}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" @click="deletePayoutMethod" class="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
              🗑
            </Button>
          </div>
          <div v-else class="p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center text-center">
            <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-3">
              <span class="text-xl">💳</span>
            </div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-1">No payout method added</h4>
            <p class="text-sm text-gray-500 mb-4">Add a bank account to receive your payouts.</p>
            <Button variant="outline" @click="addPayoutMethod">Add Payout Method</Button>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Payment History</h3>
          <ReusableTable :columns="payoutHistoryColumns" :data="payoutHistory">
            <template #status="{ row }">
              <span class="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-full text-xs font-semibold">
                {{ row.status }}
              </span>
            </template>
          </ReusableTable>
        </div>
      </TabsContent>
    </Tabs>

    <!-- Payout Request Dialog -->
    <Dialog :open="isPayoutDialogOpen" @update:open="isPayoutDialogOpen = $event">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Payout</DialogTitle>
          <DialogDescription>Enter the amount you wish to withdraw from your wallet.</DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Amount</label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-500">₦</span>
              <input
                type="number"
                v-model="payoutAmount"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-7 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="0.00"
              />
            </div>
            <p class="text-xs text-gray-500">Available balance: {{ formattedBalance }}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isPayoutDialogOpen = false">Cancel</Button>
          <Button @click="submitPayout" class="bg-purple1 text-white">Request Payout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Add Method Dialog -->
    <Dialog :open="isAddMethodDialogOpen" @update:open="isAddMethodDialogOpen = $event">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Payout Method</DialogTitle>
          <DialogDescription>Enter your bank account details to receive payouts.</DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Bank Name</label>
            <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Chase Bank" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Account Number</label>
            <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="•••• •••• •••• ••••" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isAddMethodDialogOpen = false">Cancel</Button>
          <Button @click="savePayoutMethod" class="bg-purple1 text-white">Save Method</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
