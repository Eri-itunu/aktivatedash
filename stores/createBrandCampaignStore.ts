import type { APIResponse, ICampaign, IUserProfile, PaginatedAPIResponse, PaginationMeta,Creators } from "types";

export const useCreateBrandCampaignStore = defineStore('createBrandCampaign', () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL
  const userStore = useUserStore()
  const date = new Date()

  const file = ref<File | null>(null)
  const headline = ref<string>("");
  const description = ref<string>("");
  const requirements = ref<string>("");
  const platformType = ref<string[]>([]);
  const contentType = ref<string[]>([]);
  const fileUrl = ref<string>("");
  const image = ref<string>("");
  const rateObject = ref<string[]>([]);
  const submissionDueDate = ref(new Date(date.setDate(date.getDate() + 1)));
  const startDate = ref(new Date(date.setDate(date.getDate() + 10)));
  const endDate = ref(new Date(date.setDate(date.getDate() + 15)));
  const amountPost = ref<number>(1);
  const currency = ref("NGN");
  const creators = ref<Creators[]>([])

  // filters
  const audience = ref<number | null>(null);
  const engagement = ref<number | null >(null);
  const price = ref<number | null>(null);


  const budget = computed<number>(() => {
    let total = 0
    for (let item of rateObject.value) {
      const num = Number(item.split(',')[1])
      total += num
    }
    return total
  })

  const rateCards = computed<string[]>(() => {
    const total: string[] = []
    for (let item of rateObject.value) {
      const id = item.split(',')[0]
      total.push(id)
    }
    return total
  })

  const loading_PlatformProfiles = ref(false);
  const loading_CreateCampaign = ref(false);

  const resetStore = () => {
    const date = new Date()
    headline.value = ""
    description.value = ""
    requirements.value = ""
    platformType.value = []
    contentType.value = []
    rateObject.value = []
    submissionDueDate.value = new Date(date.setDate(date.getDate() + 1))
    startDate.value = new Date(date.setDate(date.getDate() + 1))
    endDate.value = new Date(date.setDate(date.getDate() + 1))
    amountPost.value = 1
    currency.value = "NGN"
    fileUrl.value = ""
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
      "submissionDueDate": submissionDueDate.value.toISOString().split('T')[0],
      "budget": budget.value,
      "currency": currency.value,
      "numofPosts": amountPost.value,
    }

    if(fileUrl.value != ""){
      body["brief"]=fileUrl.value
    }

    try {
      loading_CreateCampaign.value = true
      const res = await $fetch<APIResponse<"campaign", ICampaign>>(`${API_URL}/campaign/create-brand-campaign`, {
      method: "POST",
      body,
      headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      loading_CreateCampaign.value = false
      resetStore()
      return res;
    }
    catch(error:any){
      loading_CreateCampaign.value = false
      throw new Error(error.data?.message || "Something went wrong")
    }
  }

  const getProfiles = async(page?: number): Promise<{data: IUserProfile[], meta: PaginationMeta }> => {
    const platform_type = platformType.value.join(',')
    const filter = {
      limit: "15",
      page: page?.toString() || "1",
      price: price.value?.toString() || "",
      followers: audience.value?.toString()  || "",
      engagement: engagement.value?.toString()  || "",
    }
    try {
      loading_PlatformProfiles.value = true;
      const qs = new URLSearchParams(filter)
      const res = await $fetch<PaginatedAPIResponse<'profiles', IUserProfile>>(`${API_URL}/profile/find-creators?platformType=${platform_type}&${qs.toString()}`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      loading_PlatformProfiles.value = false;
      return res.data.profiles;
    } catch(error: any){
        loading_CreateCampaign.value = false
        throw new Error(error.data?.message || "Something went wrong")
    }
  }

  return {
    headline, description, requirements, startDate, endDate, amountPost, platformType, contentType, rateObject, budget, currency, file, image,
    resetStore, submitCreateCampaign, getProfiles, loading_CreateCampaign, fileUrl, submissionDueDate, audience, price, engagement,creators
   }
}, {
  persist: true, // Enable persistence for this store
})
