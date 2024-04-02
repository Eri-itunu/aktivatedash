<template>
    <div class="flex justify-between items-center px-8 py-2 overflow-hidden">
        <div>
            <p class="text-[#6D6B76] text-xl"></p>
        </div>

        <div>
            <input type="text" placeholder="Search" class="rounded-[100px] bg-[#090618] text-white px-16 py-4 "/>
        </div>

        <div class="flex gap-2" >
            
            <HeadlessMenu as="div" class="relative inline-block mt-4 text-left">
                <HeadlessMenuButton><img src="/assets/icons/notification.svg" alt=""></HeadlessMenuButton>
                <HeadlessMenuItems class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <!-- Use the `active` state to conditionally style the active item. -->
                <HeadlessMenuItem
                    v-for="link in links"
                    :key="link.href"
                    :href="link.href"
                    as="a"
                    class="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                >
                    {{ link.label }}
                </HeadlessMenuItem>
                </HeadlessMenuItems>
            </HeadlessMenu>
            <img src="/assets/images/Avatar.svg" alt="">
        </div>
    </div>
</template>

<script setup>


  const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
  ]
</script>