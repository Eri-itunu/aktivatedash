import type { PaginatedAPIResponse, APIResponse, ICampaign, PaginationMeta } from 'types';


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

