import type { APIResponse, ICampaign, ContentSubmissions, BrandsDashMetrics, CampaignMetrics , PaginatedAPIResponse, IPlatformProfile} from 'types';
import axios from 'axios';


export const getContentSubmissionList = async(params:{apiUrl:string, accessToken:string})=>{
    const {apiUrl, accessToken} = params
    try {
      const res = await $fetch<PaginatedAPIResponse<"submissions", ContentSubmissions>>(
        `${apiUrl}/submission/creator/my-submissions`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return res.data.submissions.data
    } catch (error: any) {
      throw new Error(error.data?.message || "Something went wrong");
    }
}

export const acceptedCampaigns = async(params:{apiUrl:string, accessToken:string}) =>{
    const {apiUrl,accessToken} = params

    try{
        const res = await $fetch<PaginatedAPIResponse<"campaigns", ContentSubmissions>>(
            `${apiUrl}/campaign/creator/get-accepted-campaigns`,
            {
            headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        return res.data.campaigns.data
    }catch(error:any){
        throw new Error(error.data?.message || "Something went wrong");
    }
}