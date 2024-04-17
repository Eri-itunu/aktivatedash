export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore();
  // const accessToken = localStorage.getItem("accessToken");
  const accessToken = ""

  if(accessToken) {
    userStore.setToken(accessToken)
    await userStore.getProfile()
    console.log("there is a userAccount")
  }
});