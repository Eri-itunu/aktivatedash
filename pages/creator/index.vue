<script setup lang="ts">
import type { IUser, LoginResponse } from "types";
import axios from "axios";

  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"
// For Nuxt 3
definePageMeta({
  colorMode: 'light',
})
const toast = useToast()
const userStore = useUserStore()
const firstName = ref<string>();
const lastName = ref<string>();
const password = ref<string>("");
const retypePassword = ref<string>("");
const email = ref<string>('');
const phone = ref<string>('');
const loading = ref(false);
const showPassword = ref(false);
const secondPassword = ref(false)
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputType = computed( () =>
    showPassword.value ? 'text' : 'password'
)

const inputTypeTwo = computed( () =>
    secondPassword .value ? 'text' : 'password'
)
const  toggleVisibility = (e: Event) => {
    showPassword.value = !showPassword.value;
}

const toggleSecondVisibility = (e:Event) =>{
    secondPassword.value = !secondPassword.value
}

const submitSignUp = async (e: Event) =>  {
    e.preventDefault()
    
    const newMail:string = email.value
    if(!emailRegex.test(newMail)){
        toast.add({ title: "Invalid email" })
    }else if(password.value !=  retypePassword.value){
        toast.add({ title: "Passwords do not match " })
    }else{

    const body = {
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        email: email.value,
        phoneNumber: phone.value,
    }

    
    try {
        loading.value = true
        const res = await axios.post<LoginResponse<IUser>>(`${API_URL}/auth/creator-signup`, body);
        console.log('cllienttt', res)
        if(res.data.data.user) {
            console.log(res.data.data.user) // get otp from here
            userStore.setUser(res.data.data.user)
            navigateTo('creator/verifyEmail', { replace: true })
        }
        loading.value = false
    } catch(error : any) {
        loading.value = false
        console.log(error.data)
        toast.add({ title: "Error signing up" })
        
    }
}
}

</script>

<template>

    <div class="py-4 ">
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
                    <input v-model="email" type="email" placeholder="" class="border rounded border-black py-3 px-2"
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
                    <label for="">Password</label>
                    <div class=" flex justify-between items-center border p-3 border-1 border-black rounded-md">
                        <input :type="inputType" class="w-full outline-none pl-2" v-model="password" >
                        <button type="button" @click="toggleVisibility">
                        {{ showPassword ? '' : '' }} <img src="../../assets/icons/eye.svg" alt="">
                        </button>
                    </div>
                </div>

                <div class="flex flex-col w-full md:w-1/2">
                    <label for="">Re-enter Password</label>
                    <div class=" flex justify-between items-center border p-3 border-1 border-black rounded-md">
                        <input :type="inputTypeTwo" class="w-full outline-none pl-2" v-model="retypePassword" >
                        <button type="button" @click="toggleSecondVisibility">
                        {{ secondPassword ? '' : '' }} <img src="../../assets/icons/eye.svg" alt="">
                        </button>
                    </div>
                </div>
            </div>

            <!-- <nuxt-link to="creator/verifyEmail">
                <authButton message="Create Account" />
            </nuxt-link> -->
            <authButton message="Create Account" :loading="loading" />



        </form>

    </div>





</template>