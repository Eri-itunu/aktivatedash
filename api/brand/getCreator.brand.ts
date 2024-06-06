import type { APIResponse, ICampaign, ICampaignRequest, BrandsDashMetrics, CampaignMetrics , PaginatedAPIResponse, IPlatformProfile} from 'types';





export const getSingleCreator = async (params: { accessToken: string, apiUrl: string, influencerId: string }): Promise<IPlatformProfile> => {
  const { accessToken, apiUrl, influencerId } = params;
  try {
    const res = await $fetch<APIResponse<'profile', IPlatformProfile>>(`${apiUrl}/profile/one-creator/${influencerId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return res.data.profile; 
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}