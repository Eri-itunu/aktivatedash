import type { APIResponse, LoginResponse, IUser, IUserProfile } from "#build/types";

const API_DOMAIN = 'http://localhost:3333';
const API_URL = `${API_DOMAIN}/api/v2`;
export const useUserStore = defineStore("user", () => {
  const user = ref<IUser>();
  const userProfile = ref<IUserProfile>();
  const error = ref(false)
  const message = ref("")

  // const setToken = (data?: string) => (token.value = data);
  const setUser = (data?: IUser) => (user.value = data)
  const setProfile = (data?: any) => (userProfile.value = data)

  const signIn = async(data: { email: string, password: string }) => {
    try {
      const res = await $fetch<LoginResponse<IUser>>(`${API_URL}/auth/loginwithemail`, {
        method: "POST",
        body: data
      });
      // set cookie for further api calls
      // const cookie = useCookie("accessToken", )
      setUser(res.data.user);
    } catch (error) {
      // setToken();
      setUser();
      console.log(error);
    }
  }
  const getProfile = async() => {
    try {
      const res = await $fetch<APIResponse<'profile',IUserProfile>>(`${API_URL}/profile`);
      console.log(res)
    } catch (error) {
      console.log(error)
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

  return { user, userProfile, signIn, getProfile, logout }
})