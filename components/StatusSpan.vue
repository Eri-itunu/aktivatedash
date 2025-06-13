<script setup lang="ts">
const props = defineProps<{
  status: string;
}>();

const statusMap: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  pending: {
    label: 'PENDING',
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
  },
  otp_sent: {
    label: 'OTP SENT',
    bg: 'bg-blue-100',
    text: 'text-blue-800',
  },
  otp_verified: {
    label: 'OTP VERIFIED',
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
  link_denied: {
    label: 'LINK DENIED',
    bg: 'bg-red-100',
    text: 'text-red-800',
  },
};
</script>

<template>
  <span
    v-if="statusMap[status]"
    :class="`border rounded-[40px] text-[10px] px-2 ${statusMap[status].bg} ${statusMap[status].text}`"
  >
    {{ statusMap[status].label }}
  </span>
</template>
