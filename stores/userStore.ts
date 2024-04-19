import { useLocalStorage } from "@vueuse/core";
import type { APIResponse, LoginResponse, IUser, IUserProfile } from "types"

// TODO- fix env and remove local url
const API_URL = process.env.API_URL || "http://localhost:3333/api/v2"

export const useUserStore = defineStore("user", () => {

  const user = useLocalStorage<IUser | undefined>("user", ref<IUser>());
  const toast = useToast()
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
      if(error.data) {
        return error.data
      }
      console.log(error.data?.message)
    }
  }
  async function getProfile() {
    try {
      const token = accessToken.value;
      const res = await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setProfile(res.data.profile)
    } catch (error: any) {
      console.log(error.data)
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

  return { user, accessToken, setUser, userProfile, login, getProfile, logout }
})