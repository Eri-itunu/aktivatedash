export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore(); // Replace with your actual store name
  const accessToken = userStore.accessToken;

  // Redirect only if the route is within creators' or brands' dashboards
  if (to.path.startsWith('/creator/dashboard')) {
    if (!accessToken || accessToken === '' || userStore.user?.roleId != 1) {
      return navigateTo('/creator/login');
    }
  } else if (to.path.startsWith('/brands/dashboard')) {
    if (!accessToken || accessToken === '' || userStore.user?.roleId != 4) {
      return navigateTo('/brands');
    }
  }
});
