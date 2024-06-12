import type { APIResponse, IRateCard } from "types";
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
    const res = await $fetch<APIResponse<'rateCard', IRateCard>>(`${apiUrl}/platform/rate-card/${rateId}/update`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}`},
    });
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Unable to delete rate card")
  }
}
