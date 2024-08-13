import type { APIResponse, ICampaign, ICampaignRequest, BrandsDashMetrics, CampaignMetrics , PaginatedAPIResponse, IPlatformProfile} from 'types';
import axios from 'axios';


export const changeUserAvatar = async( params:{imgUrl:string, accessToken:string, apiUrl:string}):Promise<void> =>{
    const {imgUrl , accessToken, apiUrl} = params

    try{
        const res = await axios.post<APIResponse<"message", string>>(
            `${apiUrl}/profile/change-avatar`,
            { imgUrl },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
    }catch(error:any){
        throw new Error(error.data?.message || "Error uploading new avatar")
    }
}