import type { APIResponse, IUser, ResponseMessage,  LoginResponse } from 'types';
import axios from "axios";

export const getMe = async (params:{ accessToken: string, apiUrl: string}): Promise<IUser> => {
  const { accessToken, apiUrl, } = params;
  try {
    const res = await $fetch<APIResponse<'me', IUser>>(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return res.data.me;
  }

  catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong")
  }
}

export const resendOTP = async (params:{ apiUrl: string, mail:string}): Promise<void> => {
  const { apiUrl, mail}  = params;
  try {
    const res = await $fetch<ResponseMessage>(`${apiUrl}/auth/resend-otp`, {
      method: "post",
      body: {
        email: mail,
      },
      
    });
  } catch (err: any) {
    throw new Error(err.data?.message || "Unable to Resend OTP at this time")
  }
}

export const forgotPassword = async ( params:{apiUrl:string, email:string}):Promise<string> =>{
  const { apiUrl, email}  = params;
  try{
    const res = await $fetch<ResponseMessage>(`${apiUrl}/auth/forgot-password`, {
      method: "post",
      body: { email },
    });
    return res.message
  }catch(error:any){
    throw new Error(error.data?.message || "Unable to Reset Password. Please try again")
  }
}

export const resetPassword = async ( params:{apiUrl:string, email:string, otp:string, newPassword:string}):Promise<string> =>{
  const { apiUrl, email, otp, newPassword}  = params;
  try{
    const res = await $fetch<ResponseMessage>(`${apiUrl}/auth/reset-password`, {
      method: "post",
      body: { email, otp, newPassword },
    });
    return res.message
  }catch(error:any){
    throw new Error(error.data?.message || "Unable to Reset Password. Please try again")
  }
}

export const changePassword = async ( params:{apiUrl:string, body:Object, accessToken:string}):Promise<String> =>{
  const { apiUrl, body, accessToken}  = params;
  try{
    const res = await $fetch<ResponseMessage>(`${apiUrl}/auth/change-password`, {

      method: "post",
      body,
      headers: { Authorization: `Bearer ${accessToken}`},
    });
    return res.message
  }catch(error:any){
    throw new Error(error.data?.message || "Unable to Change Password. Please try again")
  }
}

// export const SignUp = async (params:{body:IUser, apiUrl: string}): Promise<IUser> => {
//   const {body, apiUrl} = params;
//   try{
//     const res = await $fetch<LoginResponse<IUser>>(`${apiUrl}/auth/creator-signup`, {
//       method: "post",
//       body
//     });
//     return res
//   }catch (error:any){

//   }
// }