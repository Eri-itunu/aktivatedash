

import type { APIResponse, IPlatformProfile } from 'types'; 


export async function get_my_platform_profiles({accessToken,apiUrl}){

    try{
      const res = await $fetch<APIResponse<'platformProfiles', IPlatformProfile[]>>(`${apiUrl}/profile/get-my-platform-profiles`, {
          headers: { Authorization: `Bearer ${accessToken}`}
        });
        return res.data.platformProfiles
      
     
    
  
    }
    catch(error:any){
      throw new Error(error.data?.message || "Something went wrong")
    }
  }

