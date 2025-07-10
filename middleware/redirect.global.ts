export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/creators') {
    return navigateTo('/creator')
  }

  if (to.path === '/brand') {
    return navigateTo('/brands')
  }

})
