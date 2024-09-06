export default defineNuxtRouteMiddleware((to, from) => {

    const userStore = useUserStore()
    userStore.$subscribe((cb)=> console.log(cb))
    const userObject = computed(() => userStore.getMe);
    console.log(userObject.value)
})