<script setup lang="ts">
import { ref } from 'vue'
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ReusableTable from '@/components/shared/ReusableTable.vue'

definePageMeta({
  layout: 'light'
})

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'product', label: 'Product' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'total', label: 'Total' },
  { key: 'dateCreated', label: 'Date Created' },
  { key: 'action', label: 'Action' },
]

const orders = ref([
  {
    id: 'ORD-001',
    name: 'John Doe',
    product: 'Wireless Headphones',
    quantity: 1,
    total: '$99.00',
    dateCreated: '2024-03-20',
    status: 'Delivered',
    email: 'john.doe@example.com',
    address: '123 Tech Lane, San Francisco, CA',
    delivery: {
      carrier: 'FedEx',
      tracking: '1234567890'
    }
  },
  {
    id: 'ORD-002',
    name: 'Jane Smith',
    product: 'Smart Watch',
    quantity: 2,
    total: '$398.00',
    dateCreated: '2024-03-19',
    status: 'Processing',
    email: 'jane.smith@example.com',
    address: '456 Innovation Blvd, New York, NY',
    delivery: {
      carrier: 'UPS',
      tracking: 'Pending'
    }
  },
  {
    id: 'ORD-003',
    name: 'Robert Brown',
    product: 'USB-C Hub',
    quantity: 1,
    total: '$45.00',
    dateCreated: '2024-03-18',
    status: 'Shipped',
    email: 'robert.b@example.com',
    address: '789 Cable St, Austin, TX',
    delivery: {
      carrier: 'DHL',
      tracking: '9876543210'
    }
  },
  {
    id: 'ORD-004',
    name: 'Emily Davis',
    product: 'Gaming Mouse',
    quantity: 1,
    total: '$59.99',
    dateCreated: '2024-03-17',
    status: 'Delivered',
    email: 'emily.d@example.com',
    address: '321 Portal Ave, Seattle, WA',
    delivery: {
      carrier: 'FedEx',
      tracking: '5566778899'
    }
  }
])

const selectedOrder = ref<any>(null)

const selectOrder = (order: any) => {
  selectedOrder.value = order
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered': return 'bg-green-100 text-green-800'
    case 'Processing': return 'bg-blue-100 text-blue-800'
    case 'Shipped': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Orders</h1>
      
      <div class="flex gap-4">
        <Select>
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <ReusableTable :columns="columns" :data="orders">
      <template #action="{ row }">
        <Sheet>
          <SheetTrigger as-child>
            <button 
              @click="selectOrder(row)"
              class="text-purplebg hover:underline font-medium"
            >
              View Details
            </button>
          </SheetTrigger>
          <SheetContent side="right" class="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Order Details</SheetTitle>
              <SheetDescription>
                Detailed information about the order, customer, and delivery.
              </SheetDescription>
            </SheetHeader>
            
            <div v-if="selectedOrder" class="mt-6 space-y-8">
              <!-- Order Info -->
              <section class="space-y-3">
                <h3 class="text-lg font-semibold border-b pb-2">Order Summary</h3>
                <div class="grid grid-cols-2 gap-y-2 text-sm">
                  <span class="text-gray-500">Order ID:</span>
                  <span class="font-medium">{{ selectedOrder.id }}</span>
                  <span class="text-gray-500">Date:</span>
                  <span>{{ selectedOrder.dateCreated }}</span>
                  <span class="text-gray-500">Status:</span>
                  <div>
                    <span :class="['px-2 py-1 rounded-full text-xs font-semibold', getStatusColor(selectedOrder.status)]">
                      {{ selectedOrder.status }}
                    </span>
                  </div>
                  <span class="text-gray-500 border-t pt-2">Product:</span>
                  <span class="font-medium border-t pt-2">{{ selectedOrder.product }}</span>
                  <span class="text-gray-500">Quantity:</span>
                  <span>{{ selectedOrder.quantity }}</span>
                  <span class="text-gray-500">Total:</span>
                  <span class="font-bold text-lg text-purplebg">{{ selectedOrder.total }}</span>
                </div>
              </section>

              <!-- Customer Info -->
              <section class="space-y-3">
                <h3 class="text-lg font-semibold border-b pb-2">Customer Details</h3>
                <div class="space-y-1 text-sm">
                  <p class="font-medium text-base">{{ selectedOrder.name }}</p>
                  <p class="text-gray-500">{{ selectedOrder.email }}</p>
                  <p class="text-gray-500 mt-2">{{ selectedOrder.address }}</p>
                </div>
              </section>

              <!-- Delivery Info -->
              <section class="space-y-3">
                <h3 class="text-lg font-semibold border-b pb-2">Delivery Information</h3>
                <div class="grid grid-cols-2 gap-y-2 text-sm">
                  <span class="text-gray-500">Carrier:</span>
                  <span>{{ selectedOrder.delivery.carrier }}</span>
                  <span class="text-gray-500">Tracking #:</span>
                  <span class="font-mono text-purplebg underline">{{ selectedOrder.delivery.tracking }}</span>
                </div>
              </section>
            </div>
          </SheetContent>
        </Sheet>
      </template>
    </ReusableTable>
  </div>
</template>
