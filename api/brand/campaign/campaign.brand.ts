import type { APIResponse, ICampaign, ICampaignRequest, BrandsDashMetrics, CampaignMetrics , PaginatedAPIResponse, IPlatformProfile, PaginationMeta, CreatorStats} from 'types';





export const getCampaign = async (params: { accessToken: string, apiUrl: string, campaignId: string }): Promise<ICampaign> => {
  const { accessToken, apiUrl, campaignId } = params;
  try {
    const res = await $fetch<APIResponse<'campaign', ICampaign>>(`${apiUrl}/campaign/brand-get-campaign/${campaignId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return res.data.campaign;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}

export const getSingleCampaignRequest = async (params:{accessToken: string, apiUrl: string, campaignId:string}) : Promise<ICampaignRequest[]> => {
  const { accessToken, apiUrl, campaignId } = params;
  try {
    const res = await $fetch<APIResponse<'requests', ICampaignRequest[] >>(`${apiUrl}/campaign/brand-get-campaign/${campaignId}/requests`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.requests;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}

export const getMetrics = async (params:{accessToken: string, apiUrl: string}) : Promise<BrandsDashMetrics> =>{
  const { accessToken, apiUrl } = params;
  try {
    const res = await $fetch<APIResponse<'metrics', BrandsDashMetrics >>(`${apiUrl}/campaign/total-campaign-metrics`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.metrics;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}

export const getSingleCampaignMetrics = async (params:{accessToken: string, apiUrl: string, campaignId:string}): Promise<CampaignMetricsResponse> => {
     const { accessToken, apiUrl, campaignId } = params;
     try {
       const res = await $fetch<APIResponse<'metrics', CampaignMetricsResponse>>(`${apiUrl}/campaign/brand/${campaignId}/analytics`, {
         headers: { Authorization: `Bearer ${accessToken}`}
       });
       return res.data.metrics;
     }
     catch (error: any) {
       throw new Error(error.data?.message || "Something went wrong")
     }
   }


export const getCampaignPosts = async (params:{accessToken: string, apiUrl: string, campaignID:string}) : Promise< {data: CreatorStats[], meta: PaginationMeta}>=>{
  const { accessToken, apiUrl, campaignID } = params;
  try {
//     const res = await $fetch<PaginatedAPIResponse<'campaignPosts', CampaignMetrics >>(`${apiUrl}/campaign/brand-get-campaign/${campaignID}/posts
// `, {
//       headers: { Authorization: `Bearer ${accessToken}`}
//     });
//     return res.data.campaignPosts

const res = await $fetch<PaginatedAPIResponse<'profiles', CreatorStats >>(`${apiUrl}/campaign/brand/${campaignID}/creators
  `, {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      return res.data.profiles
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}

export const getSingleProfile = async (params:{accessToken: string, apiUrl: string, }) : Promise<IPlatformProfile[]> =>{
  const { accessToken, apiUrl } = params;
  const platforms = ['tiktok', 'facebook']
  const plat = new URLSearchParams(platforms.map(p=>['platformType', p]))
  const platformString = plat.toString()
  try {
    const res = await $fetch<PaginatedAPIResponse<'profiles', IPlatformProfile >>(`${apiUrl}/profile/find-creators?platformType=${platformString}`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.profiles.data;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}
