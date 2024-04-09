const userStore = useUserStore();

if(!userStore.user) {
  navigateTo('/', { replace: true })
}