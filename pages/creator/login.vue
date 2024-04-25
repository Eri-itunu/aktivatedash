<script lang="ts" setup>
// For Nuxt 3
definePageMeta({
    colorMode: 'light',
})

const userStore = useUserStore();
const email = ref<string>("");
const password = ref<string>("");
const loading = ref(false);

const submitLogin = async (e: Event) => {
    const body = {
        password: password.value,
        email: email.value,
    }
    loading.value = true
    await userStore.login(body);
    loading.value = false
    if (userStore.user) {
        loading.value = false
        navigateTo('/creator/dashboard')
    }
    loading.value = false
}
</script>


<template>
    <nuxt-link to="/creator">
        <div class="p-4">
        <signBlackButton message="SignUp"  />
    </div>
    </nuxt-link>

    <div class="px-4 md:px-16 mb-24 flex flex-col gap-6">
        <h2 class="text-3xl font-semibold">Login to your Account</h2>
        <p class="text-[#6D6B76]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </div>

    <div class="flex flex-col gap-20">
        <div class="flex flex-col  md:flex-row gap-4 w-full px-4 md:px-16">
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Email </label>
                    <input v-model="email" type="email" placeholder="Your Email Address" class="border rounded border-black py-3 px-2">
                </div>
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Password</label>
                    <input v-model="password" type="password" placeholder="Your Password" class="border rounded   border-black py-3 px-2">
                </div>
            </div>

            <!-- <nuxt-link class="pb-5 md:pb-0" to="/dashboard">
                <authButton message="Go To Dashboard "/>
            </nuxt-link> -->

            <div @click="submitLogin"  class="pb-5 md:pb-0" >
                <authButton @click="submitLogin" message="Go To Dashboard" :loading="loading"/>
            </div>
    </div>
</template>