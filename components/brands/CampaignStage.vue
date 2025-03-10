<template>
    <div class="flex justify-between text-black dark:text-white px-2 items-center mt-4">
            <div class="flex gap-2 items-center">
                <div class=" relative flex items-center">
                    <img src="/icons/Frame 427321372.svg" alt="">
                    <img v-if="content" class="absolute right-0 top-0" src="../../assets/images/checkMark.svg" alt="">
                </div>

                <p class="hidden md:block">Content</p>
            </div>

            <div class="w-20 h-px bg-[#464160]"></div>

            <div class="flex gap-2 items-center">
                <div class=" relative flex items-center">
                    <img src="/icons/Frame 427321372-2.svg" alt="">
                    <img v-if="influencer"  class="absolute right-0 top-0" src="../../assets/images/checkMark.svg" alt="">
                </div>
                 <p class="hidden md:block">Influencers</p>
            </div>



            <div class="w-20 h-px bg-[#464160]"></div>

            <div class="flex gap-2 items-center">
                <div class=" relative flex items-center">
                    <img src="/icons/Frame 427321372-3.svg" alt="">
                    <img v-if="budget" class="absolute right-0 top-0" src="../../assets/images/checkMark.svg" alt="">
                </div>

                <p class="hidden md:block">Due Dates</p>
            </div>



            <div class="w-20 h-px bg-[#464160]"></div>


            <div class="flex gap-2 items-center">
                <img src="/icons/Frame 427321372-4.svg"}]}}} alt="">

                <p class="hidden md:block">Review</p>
            </div>




        </div>
</template>

<script>

export default {
    props: {
    content: Boolean,
    influencer: Boolean,
    budget: Boolean
  }
}

</script>
