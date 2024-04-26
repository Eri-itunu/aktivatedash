import { _current } from "#tailwind-config/theme/accentColor";
import type { PaginatedAPIResponse, ICampaign } from "types";



export const useCollabStore = defineStore('collaborationHub', () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"
  const userStore = useUserStore()
  const toast = useToast()
  const collabCampaigns = ref<ICampaign[]>([]);
  const pending = ref(false)



  const setCollabCampaigns = (campaigns: ICampaign[]) => {
    collabCampaigns.value.push(...campaigns)
  }

  const setPending = (campaigns: boolean) => ( pending.value = campaigns)

  async function getCollabHub() {
    const filter = {
      limit: "8",
      page: "1",
      platformType: "",
      contentType: "",
      currency: "NGN",
      price: "",
    }
    try {
      setPending(true)
      const qs = new URLSearchParams(filter)
      const res = await $fetch<PaginatedAPIResponse<'campaigns', ICampaign>>(`${API_URL}/campaign/get-collboration-hub?${qs.toString()}`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      setPending(false)
      setCollabCampaigns(res.data.campaigns.data)

    } catch(error: any){
       if(error.data?.message) {
            toast.add({title: error.data?.message})
        }
    }
  }


  return { collabCampaigns, getCollabHub, pending, }
})