import type { APIResponse, ICampaign, IPlatformProfile, PaginatedAPIResponse } from "types";
import type { VNode } from "vue";

// TODO- fix env and remove local url

const API_URL = process.env.API_URL || "http://localhost:3333/api/v2"


export const useCreateBrandCampaignStore = defineStore('createBrandCampaign', () => {
  const userStore = useUserStore()

  const platformProfiles = ref<IPlatformProfile[]>([]);

  const headline = ref<string>("Random headline");
  const description = ref<string>("");
  const requirements = ref<string>("");
  const platformType = ref<string[]>([]);
  const contentType = ref<string[]>([]);
  const rateObject = ref<string[]>([]);
  const startDate = ref(new Date());
  const endDate = ref(new Date());
  const amountPost = ref<number>(1);
  const currency = ref("NGN");

  const budget = computed<number>(() => {
    return rateObject.value.reduce((acc, item) => {
      const price = Number(item.split(',')[1])
      acc += price
    }, 0)
  })

  const rateCards = computed<string[]>(() => {
    return rateObject.value.reduce((acc, item) => {
      const id = item.split(',')[0]
      acc.push(id)
    }, [])
  })

  const loading_PlatformProfiles = ref(false);
  const loading_CreateCampaign = ref(false);

  const resetStore = () => {
    headline.value = ""
    description.value = ""
    requirements.value = ""
    platformType.value = []
    contentType.value = []
    rateCards.value = []
    startDate.value = new Date() //check this
    endDate.value = new Date()
    amountPost.value = 1
    currency.value = "NGN"
  }

  const submitCreateCampaign = async() => {
   
    const body = {
      "headline": headline.value,
      "description": description.value,
      "requirements": requirements.value,
      "contentType": contentType.value,
      "platformType": platformType.value,
      "rateCards": rateCards.value,
      "startDate": startDate.value.toISOString().split('T')[0],
      "endDate": endDate.value.toISOString().split('T')[0],
      "budget": budget,
      "currency": currency.value,
      "numOfPosts": amountPost.value
    }
    console.log("This is the body", body);
    loading_CreateCampaign.value = true
    // const res = await $fetch<APIResponse<"campaign", ICampaign>>(`${API_URL}/campaign/create-brand-campaign`, {
    //   method: "POST",
    //   body,
    //   headers: { Authorization: `Bearer ${userStore.accessToken}`}
    // });
    loading_CreateCampaign.value = false
    // return res;
  }

  const getPlatformProfiles = async() => {
     try {
      loading_PlatformProfiles.value = true;
      const res = await $fetch<PaginatedAPIResponse<'platformProfiles', IPlatformProfile>>(`${API_URL}/profile/get-platform-profiles`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      loading_PlatformProfiles.value = false;
      platformProfiles.value.push(...res.data.platformProfiles.data)

    } catch(error: any){
        throw new Error(error.data.message || "Something went wrong")
    }
  }

  return {
    headline, description, requirements, startDate, endDate, amountPost, platformType, contentType, rateObject, budget,
    resetStore, submitCreateCampaign, getPlatformProfiles, loading_CreateCampaign
   }
})