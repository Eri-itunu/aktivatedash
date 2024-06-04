import type { APIResponse, IPlatformProfile ,Tags, ResponseMessage} from 'types';


export async function get_my_platform_profiles({accessToken,apiUrl}){

    try{
      const res = await $fetch<APIResponse<'platformProfiles', IPlatformProfile[]>>(`${apiUrl}/platform/get-my-platform-profiles`, {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      return res.data.platformProfiles
    }
    catch(error:any){
      throw new Error(error.data?.message || "Something went wrong")
    }
  }


  export async function getNiche({accessToken,apiUrl}){

    try{
      const res = await $fetch<APIResponse<'tags', Tags[]>>(`${apiUrl}/profile/get-tags`, {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      return res.data.tags
    }
    catch(error:any){
      throw new Error(error.data?.message || "Something went wrong")
    }
  }

  export async function updateProfile({accessToken,apiUrl, body}){
    try{
      const res = await $fetch<ResponseMessage>(`${apiUrl}/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}`},
        body
      });
 
    }
    catch(error:any){
      throw new Error(error.data?.message || "Something went wrong")
    }

  }

 

