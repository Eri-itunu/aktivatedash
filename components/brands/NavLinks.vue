<script setup>
import { useRoute } from 'vue-router'
import { LayoutDashboard, Handshake, Ticket, ShoppingBag } from 'lucide-vue-next' // Adjust if using a different icon lib


const route = useRoute()

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    to: '/brands/dashboard',
    match: '/brands/dashboard',
    comingSoon: false,
  },
  // {
  //   label: 'Campaigns',
  //   icon: Megaphone,
  //   to: '/brands/dashboard/campaigns',
  //   match: 'campaigns',
  //   comingSoon: false,
  // },
  {
    label: 'Collaboration Hub',
    icon: Handshake,
    to: '/brands/dashboard/collaborationHub',
    match: 'collaborationHub',
    comingSoon: false,
  },
  // {
  //   label: 'Products',
  //   icon: ShoppingBag,
  //   to: '/brands/dashboard/products',
  //   match: 'products',
  //   comingSoon: false,
  // },
  // {
  //   label: 'Orders',
  //   icon: ShoppingBag,
  //   to: '/brands/dashboard/orders',
  //   match: 'orders',
  //   comingSoon: false,
  // },
  // {
  //   label: 'Influencers',
  //   icon: UsersRound,
  //   to: null,
  //   match: 'revenue',
  //   comingSoon: true,
  // },
]

const isActive = (matchPath) => {
  if(matchPath == '/brands/dashboard'){
    return  route.path === matchPath
  }
  else{
    return route.path.includes(matchPath)
  }
 
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full z-10 mr-3">
    <template v-for="(item, index) in navItems" :key="index">
      <!-- If item is coming soon (e.g. modal) -->
      <Dialog v-if="item.comingSoon">
        <DialogTrigger class="w-full">
          <div
            class="flex items-center gap-4 cursor-pointer pl-6 py-2 hover:bg-[#E9E9FE] dark:hover:bg-purplebg/20 rounded w-full"
            :class="{
              'dark:bg-[#674BE0] bg-purplebg bg-opacity-[10%] text-purplebg font-semibold': isActive(item.match),
            }"
          >
            <component :is="item.icon" class="h-[20px] w-[20px]" />
            <p class="text-black dark:text-[#98A2B3] text-nowrap text-sm">{{ item.label }}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          Coming Soon!
        </DialogContent>
      </Dialog>

      <!-- If item is a normal link -->
      <nuxt-link v-else :to="item.to" class="w-full">
        <div
          class="flex items-center gap-4 cursor-pointer pl-6 py-2 rounded hover:bg-[#E9E9FE] dark:hover:bg-purplebg/20 w-full"
          :class="{
            'bg-[#E9E9FE] dark:bg-purplebg/20 font-semibold': isActive(item.match),
          }"
        >
          <component :is="item.icon" class="h-[20px] w-[20px]" />
          <p class="text-black dark:text-white text-nowrap text-sm">{{ item.label }}</p>
        </div>
      </nuxt-link>
    </template>
  </div>
</template>
