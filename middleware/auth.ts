// middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
    const userStore = useUserStore(); // Replace with the actual store name
    const accessToken = userStore.accessToken;
    console.log("auth")
    if (!accessToken || accessToken === '') {
      return navigateTo('/creator/login'); // Redirect to the login page
    }
});