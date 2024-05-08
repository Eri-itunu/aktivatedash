import type { APIResponse, ICampaign } from 'types';




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

export const getSingleCampaignRequest = async (params:{accessToken: string, apiUrl: string, campaignId:string}) : Promise<ICampaign> => {
  const { accessToken, apiUrl, campaignId } = params;
  try {
    const res = await $fetch<APIResponse<'request', ICampaign>>(`${apiUrl}/campaign/brand-get-campaign/${campaignId}/requests`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.request;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}