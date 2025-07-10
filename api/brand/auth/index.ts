
import type { AxiosResponse } from 'axios'
import type { ResponseMessage,LoginResponse ,IUser} from "types";

export const logBrand = async (
  payload: { email: string; password: string }
) => {
  const { $http } = useNuxtApp();
  const http = $http as import('axios').AxiosInstance;
  const res: AxiosResponse<LoginResponse<IUser> > = await http.post('auth/login', payload);
  return res.data.data; 
};

export const signUpBrand = async(payload:{
   email: string,
   brandName: string,
   password: string,
   contactPersonName: string,
   contactPersonPhone: string,
   referrer?: string
})=>{
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<LoginResponse<IUser> > = await http.post('auth/brand-signup', payload);
    return res.data.data; 
   
}

export const verifyBrand = async(payload:{
   email: string,
   otp: string
})=>{
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<ResponseMessage > = await http.post('auth/verify-email', payload);
    return res.data; 
   
}

export const forgotPassword = async(payload:{
    email:string
})=>{
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<ResponseMessage > = await http.post('auth/forgot-password', payload);
    return res.data; 
    
}

export const resetPassword = async ( payload:{ email:string, otp:string, newPassword:string}) =>{
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<ResponseMessage > = await http.post('auth/reset-password', payload);
    return res.data; 
  
}


export const resetOtp = async ( payload:{ email:string}) =>{
    const { $http } = useNuxtApp();
    const http = $http as import('axios').AxiosInstance;
    const res: AxiosResponse<ResponseMessage > = await http.post('auth/resend-otp', payload);
    return res.data;
}

