import { LoginResponse, IUser } from "@/types";


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"

  // const Authorization = getRequestHeader(event, 'Authorization') || ""
  const body = await readBody(event)
  try {
    const res = await $fetch<LoginResponse<IUser>>(`${API_URL}/auth/creator-signup`, {
      method: "POST",
      body
    });

    return res
  } catch(error: any) {

  }
})
