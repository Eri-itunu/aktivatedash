export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore();

  if(!!userStore.user) {
    console.log('user is signed in. YAYYY')
  } else {
    console.log("User not signed in")
  }
});