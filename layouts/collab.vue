<script setip lang="ts" >
    
</script>

<template>
    <div>
        <header class="flex sticky top-0 bg-white z-10 justify-between items-center h-12 p-8" >
            <div>
                <h1>Create a campaign</h1>
            </div>

            <div clas="=flex gap-12 items-center">
                <button class="border-r ">
                    Cancel
                </button>

                <button class="bg-purple1 text-white  rounded-[1000px] px-3 py-1">
                    Next
                </button>
            </div>
        </header>

        <div class="p-8 bg-[#F5F5F5] px-1 md:px-24">
            <slot/>
        </div>
    </div>
</template>