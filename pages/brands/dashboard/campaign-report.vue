<script setup lang="ts">

    import collabs from '../../../mock/collabs';
    definePageMeta({
    layout: 'dashboard'
    })
</script>

<template>
    <div class="flex px-8 flex-col md:flex-row gap-5">
        <div class="flex flex-col gap-5  text-white basis-2/3">
            <img src="" alt="">
            <nuxt-link to="/brands/dashboard/campaigns">
                <p >Back</p>
            </nuxt-link>

            <div class="flex justify-between border-b-2 py-3 border-darkBlue">
                <p>Campaign Report</p>

                <div>
                    <p>BUDGET PER POST</p>
                    <span class="text-2xl">$1500</span>
                </div>
            </div>

            <h4>Pepsi Zero: Launching a new drink in Lagos</h4>


            <div class="h-[200px]">
                <img src="../../../assets/images/pexels-ethan-sees-2741674 2.svg" class="w-full h-full object-cover rounded-lg"alt="">
            </div>

            <p class="text-wrap">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia deleniti rem, architecto, voluptas ipsum, culpa neque alias optio sunt rerum tenetur laboriosam nisi? Enim error dignissimos beatae quidem dolorem.
            </p>

            <p class="text-wrap">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia deleniti rem, architecto, voluptas ipsum, culpa neque alias optio sunt rerum tenetur laboriosam nisi? Enim error dignissimos beatae quidem dolorem.
            </p>

            <div class="flex gap-1 items-center">
              <!-- icon type thing -->
              <div class="flex flex-col items-center max-w-min">
                <div class="h-2 w-2 rounded-full bg-grey1"></div>
                <div class="h-4 w-[0.05rem] rounded-full bg-grey1"></div>
                <div class="h-2 w-2 rounded-full bg-grey1"></div>
              </div>
              <!-- end icon thing-->
              <div class="text-sm text-[#CDC2FF] text-nowrap">
                <p> Start Date: <span class="font-light text-xs">March 1, 2024</span></p>
                <p> End Date: <span class="font-light text-xs">March 1, 2024</span></p>
              </div>
            </div>

            <ProgressBar :percentage="80" />

            <div class="px-3 py-3 grid grid-cols-3 gap-4 text-nowrap text-ellipsis">
                <div class="flex flex-col">
                <p class="uppercase font-thin text-xs text-grey2">views</p>
                <p class="uppercase font-bold text-sm md:text-lg">100,355,764</p>
                </div>
                <div class="flex flex-col">
                <p class="uppercase font-thin text-xs text-grey2">impressions</p>
                <p class="uppercase font-bold text-xs md:text-lg">5,853,127</p>
                </div>
                <div class="flex flex-col">
                <p class="uppercase font-thin text-xs text-grey2">engagements</p>
                <p class="uppercase font-bold text-xs md:text-lg">20%</p>
                </div>
                <div class="flex flex-col">
                <p class="uppercase font-thin text-xs text-wrap md:text-nowrap text-grey2">top age demographic</p>
                <p class="uppercase font-bold text-xs md:text-lg">21 - 34 (54% F)</p>
                </div>
                <div class="flex flex-col">
                <p class="uppercase font-thin text-xs text-grey2">top location</p>
                <p class="uppercase font-bold text-xs md:text-lg">Lagos</p>
                </div>
                <div class="flex flex-col">
                <p class="uppercase font-thin text-xs text-grey2">total audience</p>
                <p class="uppercase font-bold text-wrap text-xs md:text-lg">100,355,764</p>
                </div>
            </div>

            <div class="flex gap-5">
                <div class="flex flex-col gap-1">
                    <p>Content Type</p>
                    Photos, Videos
                </div>

                <div class="flex flex-col gap-1">
                    <p>Platform Type</p>
                    <div class="flex gap-1 overflow-hidden">
                        <img class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
                        <img class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
                        <img class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
                        <img class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
                        <img class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
                        <img class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
                        <img class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
                        <img class="object-contain" src="/assets/icons/collab/youtube.svg" alt="">
                    </div>
                </div>
            </div>

            <div>
                <h4>Requirements</h4>
                <li>Lorem ipsum dolorus nisi asperiores! Ipsam debitis placeat aliquam n</li>
            </div>


        </div>

        <div class=" flex md:flex-col gap-2 overflow-y-scroll items-center basis-1/3">
            <CollabCard
                v-for="collab in collabs"
                :key="collab.id" :collab="collab"
            />

            <InfluencerCard
                v-for="collab in collabs"
                :key="collab.id" :collab="collab"
            />
        </div>
    </div>


</template>