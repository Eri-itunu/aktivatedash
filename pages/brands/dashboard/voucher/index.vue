<template>
    <div class="h-full flex flex-col justify-center items-center" >
        
        <div class="max-w-[500px] flex flex-col gap-1 items-center text-center text-pretty" >
            <Ticket class="h-32 w-32" />
            <h1 class="text-2xl font-semibold">Create your first voucher</h1>
            <p>Turn a lump sum into redeemable vouchers that SMEs can use to run campaigns for collaboration hub on Aktivate </p>
            <nuxt-link to="voucher/fund" class="flex gap-2 items-center py-2 bg-[#5D43CB] px-2 text-xs rounded-[8px] min-w-fit text-white"> <Plus/> Create voucher </nuxt-link>
        </div>
       
    </div>
</template>

<script setup lang="ts" >
import { Ticket, Plus} from "lucide-vue-next";
definePageMeta({
  layout: "light",
});
</script>