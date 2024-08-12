import type { APIResponse, IRateCard, IPlatformProfile, PhylloResponse } from "types";
import type { CreateRateCardBody, UpdateRateCardBody } from "./platform.types";


export const createRateCard = async (payload:{ accessToken: string, apiUrl: string, body: CreateRateCardBody }): Promise<IRateCard> => {
  const { accessToken, apiUrl, body } = payload;
  try {
    const res = await $fetch<APIResponse<'rateCard', IRateCard>>(`${apiUrl}/platform/create-rate-card`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`},
      body,
    });
    return res.data.rateCard;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Unable to create rate card")
  }
}

export const updateRateCard = async (payload:{ accessToken: string, apiUrl: string, rateId: string, body: UpdateRateCardBody }): Promise<IRateCard> => {
  const { accessToken, apiUrl, body, rateId } = payload;
  try {
    const res = await $fetch<APIResponse<'rateCard', IRateCard>>(`${apiUrl}/platform/rate-card/${rateId}/update`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}`},
      body,
    });
    return res.data.rateCard;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Unable to update rate card")
  }
}

export const deleteRateCard = async (payload:{ accessToken: string, apiUrl: string, rateId: string, }): Promise<void> => {
  const { accessToken, apiUrl, rateId } = payload;
  try {
    const res = await $fetch<APIResponse<'rateCard', IRateCard>>(`${apiUrl}/platform/rate-card/${rateId}/delete`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}`},
    });
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Unable to delete rate card")
  }
}

export const get_creator_platform_profiles = async(payload:{accessToken: string, apiUrl: string}): Promise<IPlatformProfile[]>  =>{
  const { accessToken, apiUrl } = payload;
  try {
    const res = await $fetch<APIResponse<"platformProfiles", IPlatformProfile[]>>(
      `${apiUrl}/platform/get-my-platform-profiles`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return res.data.platformProfiles
  }
  catch (error: any) {
    throw new Error(error.data?.message )
  }
}

export const getPhyllo = async(payload:{accessToken: string, apiUrl: string}) =>{
  const { accessToken, apiUrl } = payload;
  try{
    const res = await $fetch<APIResponse<"phyllo", PhylloResponse>>(
      `${apiUrl}/platform/get-phyllo-sdk`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return res.data.phyllo
  }
  catch(error:any){
    throw new Error(error.data?.message )
  }
}
