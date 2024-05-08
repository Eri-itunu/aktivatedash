import type { APIResponse, ICampaign, ICampaignRequest, Metrics } from 'types';





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

export const getMetrics = async (params:{accessToken: string, apiUrl: string}) : Promise<Metrics> =>{
  const { accessToken, apiUrl } = params;
  try {
    const res = await $fetch<APIResponse<'metrics', Metrics >>(`${apiUrl}/campaign/total-campaign-metrics`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.metrics;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}