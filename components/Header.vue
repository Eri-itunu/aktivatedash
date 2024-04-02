<template>
    <div class="flex justify-between items-center px-8 py-2 overflow-hidden">
        <div>
            <p class="text-[#6D6B76] text-xl" v-if="isDashboard">Dashboard</p>
            <p class="text-[#6D6B76] text-xl" v-if="isCollaborationHub">Collaboration Hub</p>
            <p class="text-[#6D6B76] text-xl" v-if="isCampaign">Campaign</p>
            <p class="text-[#6D6B76] text-xl" v-if="isRevenue">Revenue</p>
            <p class="text-[#6D6B76] text-xl" v-if="isPlatform">Platform</p>
        </div>

        <div>
            <input type="text" placeholder="Search" class="rounded-[100px] bg-[#090618] text-white px-16 py-4 "/>
        </div>

        <div class="flex gap-2" >
            
            <img src="/assets/icons/notification.svg" alt="">
            <img src="/assets/images/Avatar.svg" alt="">
        </div>
    </div>
</template>

<script >




  export default {
  computed: {
    isDashboard() {
      // Check if the current route is the Home page
      return this.$route.path === '/dashboard';
    },
    isCollaborationHub(){
        return this.$route.path === '/dashboard/collaboration-hub';
    },
    isCampaign(){
        return this.$route.path === '/dashboard/campaigns';
    },
    isRevenue(){
        return this.$route.path === '/dashboard/revenue';
    },
    isPlatform(){
        return this.$route.path === '/dashboard/platform';
    },
  }
};
</script>

=