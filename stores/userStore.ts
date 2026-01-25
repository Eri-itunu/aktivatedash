import { useLocalStorage } from "@vueuse/core";
import ErrorCode from "../enums/errorCode";
import type { APIResponse, LoginResponse, IUser, IUserProfile } from "types"


export const useUserStore = defineStore("user", () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL 

  const user = useLocalStorage<Partial<IUser> | undefined>("user", ref<Partial<IUser>>());
  const unverifiedEmail = ref<string>("")
  const userProfile = useLocalStorage<IUserProfile | undefined>("userProfile", ref<IUserProfile>());
  // const accessToken =  useLocalStorage<string | undefined>("accessToken", ref<string>());
  // const user = ref<IUser>()
  // const userProfile = ref<IUserProfile>();
  let accessToken = ref<string>();
  const forgotemail = ref<string>()
  const savedToken = localStorage.getItem("accessToken")
  if(savedToken){
    accessToken.value = savedToken
  }

  const setAccessToken = (token?: string) => {
    accessToken.value = token
    // if (token) {
    //   localStorage.setItem("accessToken", token);
    //   return
    // }
    // localStorage.setItem("accessToken", "");
  }
  const setUser = (userData?: Partial<IUser>) =>{
    // localStorage.setItem("user", JSON.stringify(userData));
    user.value = userData
  }

  const setProfile = (profileData?: IUserProfile) =>{
    // localStorage.setItem("userProfile", JSON.stringify({ first_name: profileData?.first_name}));
    userProfile.value = profileData
  }

  const setUnverifiedEmail = (mail:string) =>{
    unverifiedEmail.value = mail
  }

  const login = async(data: { email: string, password: string }) => {
    try {
      const res = await $fetch<LoginResponse<IUser>>(`${API_URL}/auth/creator-login`, {
        method: "POST",
        body: data
      });
      setUser(res.data.user);
      setAccessToken(res.data.token);
      return res;
    } catch (error: any) {
      setAccessToken();
      setUser();
      if(error.data?.code && error.data.code === ErrorCode.UNVERIFIED_EMAIL) {
        throw new Error(ErrorCode.UNVERIFIED_EMAIL)
      }
      throw new Error(error.data?.message || "Something went wrong")
    }
  }
  
  async function getProfile() {
    try {
      const token = accessToken.value;
      const res = await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setProfile(res.data.profile)
      return res.data.profile
    } catch (error: any) {
      throw new Error(error.data?.message || "Something went wrong")
    }
  }

  async function getMe(): Promise<void> {
    try {
      const token = accessToken.value;
      const res = await $fetch<APIResponse<'me',IUser>>(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setUser(res.data.me);
    } catch (error: any) {
      throw Error("cannot get me")
    }
  }

  const logout = async() => {
    try {
      // await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/auth/logout`);
      accessToken.value = "";
      setUser()
      setAccessToken()
      setProfile()
    } catch (error) {
    }
  }

  async function updateProfile(data: Partial<IUserProfile>): Promise<void> {
    const body = {
      "firstName": data.firstName,
      "lastName": data.lastName,
      "dateOfBirth": data.dateOfBirth || null,
      "website": data.website || null,
      "bio": data.bio || null,
      "niche": data.niche,
    }
    try {
      const token = accessToken.value;
      const res = await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}`},
        method: "PUT",
        body
      });
      setProfile(res.data.profile)
    } catch (error: any) {
      throw new Error(error.data?.message || "Something went Wrong")
    }
  }

  return { user, accessToken, setUser, setAccessToken,unverifiedEmail,setUnverifiedEmail, userProfile, login, getProfile, logout, getMe, updateProfile, forgotemail }
}, {
  persist: true, // Enable persistence for this store
})