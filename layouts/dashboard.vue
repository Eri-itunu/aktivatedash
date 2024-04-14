<template>
    
    <div class="flex px-2 h-screen w-screen bg-[#100C21]">
        <div class="absolute  z-50 w-screen flex h-screen items-center md:hidden duration-700 ease-in-out" 
        :class="{ 'left-[-100%] ': !sidebar, 'left-[0]': sidebar }">
            <MobileSidebar />
        </div>
        
        <div class= " hidden py-5  md:block md:w-96 ">
            <Sidebar :toggleSidebar = "toggleSidebar" />
        </div>

        <div class="w-full overflow-hidden py-5 overflow-y-scroll h-screen ">
            <Header :toggleSidebar = "toggleSidebar" />

            <div class="overflow-hidden h-full overflow-y-scroll overflow-x-hidden p-3">
                <slot/>
            </div>


        </div>
    </div>
</template>

<script >
    export default{
        data() {
            return{
                sidebar: false
            }
        },
        methods: {
            toggleSidebar(){
                this.sidebar = !this.sidebar

            }
        }
    }

</script>



