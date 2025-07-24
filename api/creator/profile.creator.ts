import type { APIResponse, IPlatformProfile ,Tags, ResponseMessage, PaginatedAPIResponse,ContentSubmissions, IUserProfile} from 'types';

import { API_ROUTES } from "@/constants/routes";
import type { AxiosResponse } from 'axios'

export interface Country {
        _id: string,
        code: string,
        __v: number,
        createdAt: Date,
        name: string,
        updatedAt: Date,
        id: string
}

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

  export async function getContentSubmissionList({ accessToken, apiUrl}){

    try {
      const res = await $fetch<PaginatedAPIResponse<'submissions', ContentSubmissions>>(`${apiUrl}/submission/creator/my-submissions`, {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      return res.data.submissions;
    }
  
    catch (error: any) {
      throw new Error(error.data?.message || "Something went wrong")
    }
  }

  export const getCountries = async()=> {
      const { $http } = useNuxtApp();
      const http = $http as import('axios').AxiosInstance;
      const res: AxiosResponse<APIResponse<'countries', Country[]>> = await http.get(API_ROUTES.PROFILE.COUNTRIES);
      return res.data.data.countries; 
  }

  export const getStates = async (countryCode?: string) => {
  const { $http } = useNuxtApp();
  const http = $http as import('axios').AxiosInstance;

  const url = countryCode
    ? API_ROUTES.PROFILE.STATES(countryCode)
    : 'profile/states'; // fallback to default route or whatever makes sense

  const res: AxiosResponse<APIResponse<'states', Country[]>> = await http.get(url);
  return res.data.data.states;
}

  export const getProfile = async()=>{
    const {$http} = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<APIResponse<'profile', IUserProfile>> = await http.get(API_ROUTES.PROFILE.GET_PROFILE);
    return res.data.data; 
  }

  export interface updateBody{
   website?:string,
   dateOfBirth?:string, 
   bio?: string, 
   niche?: string[],
   countryCode?:string,
   state?:string 
}

  export const createUpdateProfile = async(payload:updateBody)=>{
    const {$http} = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<APIResponse<'profile', IUserProfile>> = await http.put(API_ROUTES.PROFILE.UPDATE_PROFILE, payload);
    return res.data.data; 
  }
 

