<script lang="ts" setup>
// For Nuxt 3

definePageMeta({
    colorMode: 'light',
})



import UserRoles from '../../enums/userRoles';
const toast = useToast();
const userStore = useUserStore();
const email = ref<string>("");
const password = ref<string>("");
const loading = ref(false);
const showPassword = ref(false);

const  toggleVisibility = (e: Event) => {
    showPassword.value = !showPassword.value;
}

const inputType = computed( () =>
    showPassword.value ? 'text' : 'password'
)

const submitLogin = async (e: Event) => {
    const body = {
        password: password.value,
        email: email.value,
    }
    loading.value = true
    try {
        await userStore.login(body);
        loading.value = false
 
        if (userStore.user && userStore.user.role_id === UserRoles.CREATOR) {
            navigateTo('/creator/dashboard')
        } 
    } catch (error: any) {
        loading.value = false
        console.log(error)
        toast.add({ title: error.message })
    }
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
        <p class="text-[#6D6B76]">Login to your Aktivate Creator account</p>
    </div>

    <div class="flex flex-col gap-20">
        <div class="flex flex-col items-center md:flex-row gap-4 w-full px-4 md:px-16">
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Email </label>
                    <input v-model="email" type="email" placeholder="Your Email Address" class="border rounded border-black py-3 px-2">
                </div>
                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Password </label>
                    <div class=" flex justify-between items-center border p-3 border-1 border-black rounded-md">
                        <input :type="inputType" class="w-full outline-none pl-2" v-model="password" :placeholder="`enter password`">
                        <button type="button" @click="toggleVisibility">
                        {{ showPassword ? '' : '' }} <img src="../../assets/icons/eye.svg" alt="">
                        </button>
                    </div>
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