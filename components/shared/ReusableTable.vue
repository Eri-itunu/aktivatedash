<script setup lang="ts">
import { defineProps } from 'vue';

interface Column {
  key: string;
  label: string;
  class?: string;
  hideOnMobile?: boolean;
}

interface Props {
  columns: Column[];
  data: any[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>

<template>
  <div class="relative rounded-lg shadow-md sm:rounded-lg overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-darkBlue dark:text-purplebg">
        <tr>
          <th 
            v-for="col in columns" 
            :key="col.key" 
            scope="col" 
            class="px-6 py-3"
            :class="[col.class, { 'max-lg:hidden': col.hideOnMobile }]"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length" class="px-6 py-4 text-center">
            Loading...
          </td>
        </tr>
        <tr v-else-if="data.length === 0">
          <td :colspan="columns.length" class="px-6 py-4 text-center">
            No data available
          </td>
        </tr>
        <tr
          v-else
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue"
        >
          <td 
            v-for="col in columns" 
            :key="col.key" 
            class="px-6 py-4"
            :class="[col.class, { 'max-lg:hidden': col.hideOnMobile }]"
          >
            <!-- Slot for custom cell content based on column key -->
            <slot :name="col.key" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
