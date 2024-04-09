<script lang="ts" setup>

definePageMeta({
  layout: "dashboard",
})
const userStore = useUserStore();
const email = ref("test.creator@test.com")
const password = ref("bigsecret")

const signIn = async (event: any) => {
  event.preventDefault();
  await userStore.signIn({ email: email.value, password: password.value });
  // await navigateTo("/dashboard", { replace: true });
}
</script>


<template>
  <div class="container fles items-center justify-center text-white">
    <h1>This is a dummy page</h1>
    <form @submit="signIn" class="flex items-center flex-col">
      <h1>Welcome to Aktivate</h1>
      <h2> Please sign in to your profile </h2>
      <label>Email</label>
      <input type="email" placeholder="enter email here"/>
      <label>Password</label>
      <input type="password" placeholder="enter password here"/>
      <button class="p-2 bg-grey2"> sign In please</button>

      <p> {{ userStore.user?.email || "email should be here" }} </p>
      <p> {{ userStore.userProfile?.first_name || "first name should be here"}} </p>
    </form>
    <button @click="userStore.getProfile" class="p-2 bg-grey2"> sign In please</button>
  </div>
</template>


