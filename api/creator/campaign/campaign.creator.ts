import type { PaginatedAPIResponse, APIResponse, ICampaign, PaginationMeta,ICampaignRequest, InstagramPosts } from 'types';


export const getCollaborationHub = async (params:{ accessToken: string, apiUrl: string, qs: string }): Promise<{ meta: PaginationMeta, data: ICampaign[] }> => {
  const { accessToken, apiUrl, qs } = params;
  try {
    const res = await $fetch<PaginatedAPIResponse<'campaigns', ICampaign>>(`${apiUrl}/campaign/get-collboration-hub?${qs}`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.campaigns;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}

export const getCampaign = async (params:{ accessToken: string, apiUrl: string, campaignId:string }): Promise<ICampaign> => {
  const { accessToken, apiUrl, campaignId } = params;
  try {
    const res = await $fetch<APIResponse<'campaign', ICampaign>>(`${apiUrl}/campaign/creator-get-campaign/${campaignId}`, {
      headers: { Authorization: `Bearer ${accessToken}`}
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
    const res = await $fetch<APIResponse<'requests', ICampaignRequest[] >>(`${apiUrl}/campaign/creator-get-campaign/${campaignId}/requests`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.requests;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}


export const getInstagramPosts = async (params:{accessToken: string, apiUrl: string, platformId:string}) : Promise<InstagramPosts[]> => {
  const { accessToken, apiUrl, platformId } = params;
  try {
    const res = await $fetch<APIResponse<'posts', InstagramPosts[] >>(`${apiUrl}/platform/get-instagram-posts/${platformId}`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.posts;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}

export const getPosts = async(params:{accessToken: string, apiUrl: string, platformProfileId: string}): Promise<any[]> => {
  const { apiUrl, accessToken, platformProfileId } = params;

  try {
    const res = await $fetch<APIResponse<'posts', any[]>>(`${apiUrl}/platform/get-posts/${platformProfileId}`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.posts;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}


