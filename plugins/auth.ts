export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore();
  // const accessToken = localStorage.getItem("accessToken");
  const accessToken = null

  if(accessToken) {
    userStore.setToken(accessToken)
    await userStore.getProfile()
    console.log("there is a userAccount")
  }
});