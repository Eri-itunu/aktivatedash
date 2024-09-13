<script setup lang="ts">
import { getSingleCreator } from "@/api/brand/getCreator.brand";
import type { IPlatformProfile, NPlatformProfile } from "types";
definePageMeta({
  layout: "brands",
  colorMode: "dark",
});



const route = useRoute();
const router = useRouter();
const API_URL = useRuntimeConfig().public.API_URL;
const userStore = useUserStore();
const createBrandCampaignStore = useCreateBrandCampaignStore();
const { rateObject,creators } = storeToRefs(createBrandCampaignStore);
const loading = ref(true);
const profile = ref<NPlatformProfile>();
const workPlatforms = ref<IPlatformProfile[]>([]);
const selectedIndex = ref(0);
const changePlatform = (index) => {
  selectedIndex.value = index;
};
const showSpinner = ref(false);


const selected =(rate , platform:string)=>{
  if(profile.value){
    const newCreator= {
        firstName: profile.value.firstName,
        lastName: profile.value.lastName,
        platform: platform,
        rates :rate
    }
    creators.value.push(newCreator)
  }

  
}

const removeCreatorById = (idToRemove) => {
  creators.value = creators.value.filter(creator => creator.rates.id !== idToRemove);
};
// const newWorkPlatforms = ref<IPlatformProfile[]>([])

// const selectRate = (id,price) =>{
//     value = [id,price].join(',')
//     rateObject.append(value)
// }
const getCreator = async () => {
  showSpinner.value = true;
  const { influencerId } = route.params;
  const accessToken = userStore.accessToken || "";

  try {
    const res = await getSingleCreator({
      apiUrl: API_URL,
      influencerId,
      accessToken,
    });
    showSpinner.value = false;
    loading.value = false;
    profile.value = res;
    workPlatforms.value = res.platformProfiles.filter(element => element.rate.length>0)

  } catch (error: any) {
    loading.value = false;
  }
};

watchEffect(async () => await getCreator());
</script>

<template>
  <div
    v-if="showSpinner"
    class="w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center"
  >
    <LoadSpinner />
  </div>
  <div class="px-4">
    <button @click="router.back()" class="flex gap-2 mb-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"
          fill="currentColor"
        />
      </svg>
      Go back
    </button>
    <div class="w-full rounded-lg border-[0.5px] py-4 border-[#464160] bg-vDarkBlue">
      <!-- Creator Info Portion -->
      <div
        class="border-b border-darkBlue flex gap-2 flex-col items-center justify-center py-4 p-auto"
      >
        <div
          class="border-4 rounded-full justify-center flex items-center bg-purplelabel w-20 h-20"
        >
          <img v-if="profile?.imgUrl !=null " class="object-contain rounded-full" :src="profile?.imgUrl" alt="">
          <p v-else class="text-xl text-black font-bold">
            {{ profile?.firstName?.charAt(0) }}{{ profile?.lastName?.charAt(0) }}
          </p>
        </div>
        <p class="font-bold">{{ profile?.firstName }} {{ profile?.lastName }}</p>

        <div class="flex flex-wrap gap-2">
          <div v-for="niche in profile?.niche" :key="niche">
            <div class="rounded-[16px] px-[12px] py-[4px] bg-white text-black">
              #{{ niche }}
            </div>
          </div>
        </div>

        <div v-if="profile?.bio">
         <p class="text-center px-4" > {{ profile?.bio }}</p>
        </div>
        <div v-else-if="profile && !profile?.bio">
          <p>No bio</p>
        </div>
      </div>

      <!-- Platforms -->

      <div class="px-2 md:px-8 py-4 flex flex-col gap-5">
        <p class="font-bold">Platforms</p>

        <!-- <div class="flex gap-5 w-full">
          <div  v-for="(p, index) in workPlatforms">
            <div
             v-if="p.workPlatform  &&  platformType.includes(p.workPlatform)"
              @click="changePlatform(index)"
              class="flex gap-2 cursor-pointer"
              :class="{ 'border-b-2 border-purple1 ': selectedIndex == index }"
            >
              <img
                v-if="p.workPlatform.includes('tiktok') "
                src="/assets/icons/tiktokProfile.svg"
                alt=""
              />
              <img
                v-if="p.workPlatform.includes('instagram')"
                src="/assets/icons/instagramProfile.svg"
                alt=""
              />
              <img
                v-if="p.workPlatform.includes('facebook')"
                src="/assets/icons/facebook.svg"
                alt=""
                class="h-5"
              />
              <p class="hidden md:block">{{ p.workPlatform }}</p>
            </div>
          </div>
        </div> -->

         <!-- Tab switching section -->
         <section class="tab-section text-white flex w-full "
         >
            <div
                v-for="(tab, index) in workPlatforms "
                
                :key="tab.id"
                :class="[
                ' basis-1/3 cursor-pointer text-center gap-2 items-center pr-2 py-4  flex max-w-fit text-sm' ,
                index === selectedIndex ? ' border-b-purple1 border-b-[2px] text-purple1' : 'border-b-[1px] border-b-grey1 '
                ]"
                @click="changePlatform(index)"
            >
                  <div class="flex items-center text-center gap-2" >
                    <img
                    v-if="tab.workPlatform.includes('tiktok') "
                    src="/assets/icons/tiktokProfile.svg"
                    alt=""
                  />
                  <img
                    v-if="tab.workPlatform.includes('instagram')"
                    src="/assets/icons/instagramProfile.svg"
                    alt=""
                  />
                  <img
                    v-if="tab.workPlatform.includes('facebook')"
                    src="/assets/icons/facebook.svg"
                    alt=""
                    class="h-5"
                  />
                  <p class="hidden md:block">{{ tab.workPlatform }}</p>

                  </div>
            </div>
            <div class="  border-b-grey1 border-b-[1px] w-full" >

            </div>
        </section>

        <div
          class="w-full mt-5 flex justify-between items-center px-2 md:px-8 py-4 gap-1 md:gap-5 rounded-lg border-[0.5px] border-white"
        >
          <div class="flex flex-col items-center text-center justify-center">
            <p class="font-bold md:text-2xl">
              {{
                workPlatforms[selectedIndex]?.reputationFollowerCount.toLocaleString()
              }}
            </p>
            <p class="text-sm md:text-lg">Followers</p>
          </div>

          <div class="flex flex-col items-center text-center justify-center">
            <p class="font-bold md:text-2xl">
              {{
                workPlatforms[selectedIndex]?.reputationContentCount.toLocaleString()
              }}
            </p>
            <p class="text-sm md:text-lg">Content</p>
          </div>

          <div class="flex flex-col items-center text-center justify-center">
            <p class="font-bold md:text-2xl">
              {{ workPlatforms[selectedIndex]?.engagementRate }}%
            </p>
            <p class="word-break text-sm md:text-lg">Engagement Rate</p>
          </div>

          <div class="flex flex-col items-center text-center justify-center">
            <p class="font-bold md:text-2xl">
              {{
                workPlatforms[selectedIndex]?.reputationSubscriberCount.toLocaleString()
              }}
            </p>
            <p class="text-sm md:text-lg">Subscibers</p>
          </div>
        </div>
      </div>

      <!-- Rates -->
      <div class="w-full px-2 md:px-8 mt-5">
        <h1>Rates</h1>
        <div class="rounded-lg border-[0.5px] border-white">
          <div
            class="flex bg-[#1D192F] rounded-t-lg border-b border-white justify-between"
          >
            <p
              class="basis-1/3 text-purplebg font-bold text-left py-4 flex justify-start sm:pl-2"
            >
              Service
            </p>
            <p
              class="basis-1/3 text-purplebg font-bold text-left py-4 flex border-l border-white justify-start sm:pl-2"
            >
              Rate
            </p>
            <p
              class="basis-1/3 text-purplebg font-bold text-left py-4 flex border-l border-white justify-start sm:pl-2"
            >
              Description
            </p>
          </div>
          <div
            v-for="(rate, index) in workPlatforms[selectedIndex]?.rate"
            class="flex border-t items-center h-24 justify-between"
          >
            <div
              class="basis-1/3 flex h-full items-center rounded-bl-lg justify-start pl-2"
            >
              {{ rate.type }}
            </div>

            <div
              class="basis-1/3 border-l border-white flex h-full items-center justify-start pl-2"
            >
              {{ rate.currency }} {{ rate?.price.toLocaleString() }}
            </div>
            <div
              class="basis-1/3 border-l flex-col border-white flex h-full justify-center pl-2"
            >
              <p>{{ rate.description }}</p>
              <input
                class="hidden"
                v-model="rateObject"
                :id="index.toString()"
                type="checkbox"
                :value="[rate.id, rate.price].join(',')"

              />
             
              <label
                v-if="rateObject.includes([rate.id, rate.price].join(','))"
                :for="index.toString()"
                class="cursor-pointer w-3/4 py-1 text-sm text-white bg-purple1 px-2 rounded-lg"
                @click="removeCreatorById(rate.id)"
              >
                <p>&check; Rate Added</p>
              </label>
              <label
                v-else
                :for="index.toString()"
                class="cursor-pointer border-2 w-3/4 py-1 text-sm text-purplelabel px-2 rounded-lg"
                @click="selected(rate, workPlatforms[selectedIndex].workPlatform )"
              >
                <p>+ Add to campaign</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
