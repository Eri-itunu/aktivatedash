import { LoginResponse, IUser } from "@/types";


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"

  // const Authorization = getRequestHeader(event, 'Authorization') || ""
  const body = await readBody(event)
  console.log(body)
  try {
    const res = await $fetch<LoginResponse<IUser>>(`${API_URL}/auth/creator-signup`, {
      method: "POST",
      body
    });
    console.log('res from the server', res)
    return res
  } catch(error: any) {
    console.log("error from the server", {error})
  }
})
