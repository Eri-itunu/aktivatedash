<script setup lang="ts">
import type { IUser, LoginResponse } from "types";

// TODO- fix env and remove local url
const API_URL = process.env.API_URL || "http://localhost:3333/api/v2"
// For Nuxt 3
definePageMeta({
  colorMode: 'light',
})
const toast = useToast()
const userStore = useUserStore()
const firstName = ref<string>();
const lastName = ref<string>();
const password = ref<string>("bigsecret");
const email = ref<string>();
const phone = ref<string>();
const loading = ref(false);



const submitSignUp = async (e: Event) =>  {
    e.preventDefault()
    const body = {
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        email: email.value,
        phoneNumber: phone.value,
    }
    try {
        loading.value = true
        const res = await $fetch<LoginResponse<IUser>>(`${API_URL}/auth/creator-signup`, {
            method: "post",
            body,
            headers: { 'Content-Type': 'application/json' },
        });
        if(res.data.user) {
            console.log(res.data.user) // get otp from here
            userStore.setUser(res.data.user)
            navigateTo('creator/verifyEmail', { replace: true })
        }
        loading.value = false
    } catch(error : any) {
        loading.value = false
        console.log(error.data)
        toast.add({ title: "Error signing up" })
    }
}

</script>

<template>

    <div class="pt-2">
        <nuxt-link to="/creator/login">
            <signBlackButton message="Login" />
        </nuxt-link>

        <div class="px-4 md:px-16 mb-12">
            <h2 class="text-3xl font-semibold">Create New Account</h2>
        </div>

        <form @submit="submitSignUp" action="#" class="flex flex-col gap-4">

            <div class="flex flex-col  md:flex-row gap-4 w-full px-4 md:px-16">

                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">First Name</label>
                    <input v-model="firstName" type="text" placeholder="" class="border rounded border-black py-3 px-2"
                        required>
                </div>

                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Last Name</label>
                    <input v-model="lastName" type="text" placeholder="" class="border rounded   border-black py-3 px-2"
                        required>
                </div>

            </div>

            <div class="flex flex-col  md:flex-row gap-4 w-full px-4 md:px-16">

                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Email Address </label>
                    <input v-model="email" type="text" placeholder="" class="border rounded border-black py-3 px-2"
                        required>
                </div>

                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Phone number</label>
                    <input v-model="phone" type="text" placeholder="" class="border rounded   border-black py-3 px-2"
                        required>
                </div>

                

            </div>

            <div class="flex flex-col  md:flex-row gap-4 w-full px-4 md:px-16">
                <div class="flex flex-col w-full md:w-1/2">
                    <Password placeholder="Enter  Password"/>
                </div>

                <div class="flex flex-col w-full md:w-1/2">
                    <Password placeholder="Retype Password"/>
                </div>
                
            </div>

            <!-- <nuxt-link to="creator/verifyEmail">
                <authButton message="Create Account" />
            </nuxt-link> -->
            <authButton message="Create Account" :loading="loading" />

           



        </form>

    </div>





</template>