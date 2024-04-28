import type {  ICampaign, APIResponse,PaginatedAPIResponse, GetResponse } from "types";






export const useGetBrandCampaignStore = defineStore('getBrandCampaign', () =>{

    const config = useRuntimeConfig()
    const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"
    const userStore = useUserStore()

    const campaigns = ref<ICampaign[]>([]);
    const loading_Campaigns = ref(false);


    const getBrandCampaigns = async()=>{

        try{
            loading_Campaigns.value = true
            const res = await $fetch<APIResponse<'campaigns', ICampaign[]>>(`${API_URL}/campaign/get-my-campaigns`, {
                headers: { Authorization: `Bearer ${userStore.accessToken}`}
              });

              loading_Campaigns.value = false;
              campaigns.value.push(...res.data.campaigns)
              console.log(res)
         
        } 
        catch(error:any){
            loading_Campaigns.value = false
            throw new Error(error.data?.message || "Something went wrong")
        }
    }

    const payForCampaign = async(id:string) =>{

        try{
            const res = await $fetch<APIResponse<'campaigns', string>>(`${API_URL}/campaign/pay-for-campaign/${id}`, {
                headers: { Authorization: `Bearer ${userStore.accessToken}`}
            });
            console.log(res.data)
            return(res.data)
            
        }   
        catch(error:any){
            throw new Error(error.data?.message || "Something went wrong")
        }
    
    }

    return{campaigns, loading_Campaigns, getBrandCampaigns, payForCampaign }
})