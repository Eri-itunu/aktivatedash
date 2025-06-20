import { API_ROUTES } from "@/constants/routes";
import type { AxiosResponse } from 'axios'
import type { APIResponse as ApiResponse,SocialPlatformProfile, platformLinkRequest} from "types";



export const getPlatformProfiles = async()=> {
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<ApiResponse<"platformProfiles", SocialPlatformProfile[]>> = await http.get(API_ROUTES.PLATFORMS.GET_PLATFORM_PROFILES);
    return res.data.data; 
}

export const getLinkRequests = async()=>{
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<ApiResponse<"platformLinkRequests", platformLinkRequest[]>> = await http.get(API_ROUTES.PLATFORMS.GET_LINK_REQUEST);
    return res.data.data; 
    
}

export const postLinkRequests = async(payload: { url: string; platform:string })=>{
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    console.log(payload)
    const res: AxiosResponse<ApiResponse<"platformLinkRequests", platformLinkRequest[]>> = await http.post(API_ROUTES.PLATFORMS.POST_LINK_REQUEST,payload);
    return res.data.data; 
}

export const verifyPlatform = async( payload: { otp: string; platformLinkRequestId:string })=>{
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    console.log(payload)
    const res: AxiosResponse<ApiResponse<"platformLinkRequests", platformLinkRequest[]>> = await http.post(API_ROUTES.PLATFORMS.VERIFY_PLATFORM(payload.platformLinkRequestId), payload);
    return res.data.data; 
}

