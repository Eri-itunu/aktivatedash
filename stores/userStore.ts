import type { APIResponse, LoginResponse, IUser, IUserProfile } from "types"

// TODO- fix env and remove local url
const API_URL = process.env.API_URL || "http://localhost:3333/api/v2"

export const useUserStore = defineStore("user", () => {
  const user = ref<IUser>();
  const userProfile = ref<IUserProfile>();
  const token = ref();

  const setToken = (data?: string) => (token.value = data);
  const setUser = (data?: IUser) => (user.value = data)
  const setProfile = (data?: any) => (userProfile.value = data)

  const login = async(data: { email: string, password: string }) => {
    try {
      const res = await $fetch<LoginResponse<IUser>>(`${API_URL}/auth/login`, {
        method: "POST",
        body: data
      });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("accessToken", res.data.token);
      await getProfile()
    } catch (error: any) {
      setToken();
      setUser();
      console.log(error.data?.message);
    }
  }
  const getProfile = async() => {
    try {
      const res = await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token.value}`}
      });
      setProfile(res.data.profile)
    } catch (error: any) {
      console.log(error.data?.message);
    }
  }
  const logout = async() => {
    try {
      const res = await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/auth/logout`);
      setUser()
      setProfile()
    } catch (error) {
      console.log("error logging out")
      console.log(error)
    }
  }

  return { user, token, setToken, setUser, userProfile, login, getProfile, logout }
})