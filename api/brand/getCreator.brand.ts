import type { APIResponse, ICampaign, ICampaignRequest, BrandsDashMetrics, CampaignMetrics , PaginatedAPIResponse,NPlatformProfile} from 'types';





export const getSingleCreator = async (params: { accessToken: string, apiUrl: string, influencerId: string }): Promise<NPlatformProfile> => {
  const { accessToken, apiUrl, influencerId } = params;
  try {
    const res = await $fetch<APIResponse<'profile', NPlatformProfile>>(`${apiUrl}/profile/one-creator/${influencerId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return res.data.profile; 
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}