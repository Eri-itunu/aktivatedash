import type {  ICampaign, APIResponse,PaginatedAPIResponse, GetResponse } from "types";






export const useGetBrandCampaignStore = defineStore('getBrandCampaign', () =>{

    const config = useRuntimeConfig()
    const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"
    const userStore = useUserStore()

  


    const getBrandCampaigns = async(): Promise< ICampaign[]>=>{

        try{
  
            const res = await $fetch<APIResponse<'campaigns', ICampaign[]>>(`${API_URL}/campaign/get-my-campaigns`, {
                headers: { Authorization: `Bearer ${userStore.accessToken}`}
              });

              
              return res.data.campaigns
         
        } 
        catch(error:any){
   
            throw new Error(error.data?.message || "Something went wrong")
        }
    }

    const payForCampaign = async(id:string):Promise<{url:string}> =>{

        try{
            const res = await $fetch<APIResponse<'url', string>>(`${API_URL}/campaign/pay-for-campaign/${id}`, {
                headers: { Authorization: `Bearer ${userStore.accessToken}`}
            });
            console.log(res.data)
            return res.data
            
        }   
        catch(error:any){
            throw new Error(error.data?.message || "Something went wrong")
        }
    
    }

    return{ getBrandCampaigns, payForCampaign }
})