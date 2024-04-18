import { _current } from "#tailwind-config/theme/accentColor";
import type { PaginatedAPIResponse, ICampaign } from "types";

// TODO- fix env and remove local url
const API_URL = process.env.API_URL || "http://localhost:3333/api/v2";

export const useCollabStore = defineStore('collaborationHub', () => {
  const userStore = useUserStore()
  const toast = useToast()
  const collabCampaigns = ref<ICampaign[]>([]);
  const pending = ref(false)

  const filter = {
    limit: 10,
    page: 1,
    platformType: "",
    contentType: "",
    price: 0, // Note- price filter will work for only USD if currency is not set
    currency: "",
  }

  const setCollabCampaigns = (campaigns: ICampaign[]) => {
    collabCampaigns.value = campaigns
  }

  const setPending = (campaigns: boolean) => ( pending.value = campaigns)

  async function getCollabHub() {
    try {
      setPending(true)
      const res = await $fetch<PaginatedAPIResponse<'campaigns', ICampaign>>(`${API_URL}/campaign/get-collboration-hub`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      console.log(res.data);
      setPending(false)
      setCollabCampaigns(res.data.campaigns.data)

    } catch(error: any){
       if(error.data?.message) {
            toast.add({title: error.data?.messag})
        }
    }
  }


  return { collabCampaigns, getCollabHub, pending, }
})