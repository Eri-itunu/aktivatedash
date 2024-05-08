import { useLocalStorage } from "@vueuse/core";
import type { APIResponse, LoginResponse, IUser, IUserProfile } from "types"

const config = useRuntimeConfig()


export const useUserStore = defineStore("user", () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"

  const user = useLocalStorage<IUser | undefined>("user", ref<IUser>());

  const userProfile = useLocalStorage<IUserProfile | undefined>("userProfile", ref<IUserProfile>());
  // const accessToken =  useLocalStorage<string | undefined>("accessToken", ref<string>());
  // const user = ref<IUser>()
  // const userProfile = ref<IUserProfile>();
  let accessToken = ref<string>();
  const savedToken = localStorage.getItem("accessToken")
  if(savedToken){
    accessToken.value = savedToken
  }

  const setAccessToken = (token?: string) => {
    accessToken.value = token
    if (token) {
      localStorage.setItem("accessToken", token);
      return
    }
    localStorage.setItem("accessToken", "");
  }
  const setUser = (userData?: IUser) =>{
    localStorage.setItem("user", JSON.stringify(userData));
    user.value = userData
  }

  const setProfile = (profileData?: IUserProfile) =>{
    // localStorage.setItem("userProfile", JSON.stringify({ first_name: profileData?.first_name}));
    userProfile.value = profileData
  }

  const login = async(data: { email: string, password: string }) => {
    try {
      const res = await $fetch<LoginResponse<IUser>>(`${API_URL}/auth/login`, {
        method: "POST",
        body: data
      });
      setUser(res.data.user);
      setAccessToken(res.data.token);
      return res;
    } catch (error: any) {
      setAccessToken();
      setUser();
      throw new Error(error.data?.message || "Something went wrong")
    }
  }
  async function getProfile(): Promise<void> {
    try {
      const token = accessToken.value;
      const res = await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setProfile(res.data.profile)
    } catch (error: any) {
      console.log(error)
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
      await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/auth/logout`);
      setUser()
      setAccessToken()
      setProfile()
    } catch (error) {
      console.log("error logging out")
      console.log(error)
    }
  }

  return { user, accessToken, setUser, userProfile, login, getProfile, logout, getMe }
})