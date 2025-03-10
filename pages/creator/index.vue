<script setup lang="ts">

//imports
import type { IUser, LoginResponse, ResponseMessage } from "types";
import axios from "axios";
import { useToast } from "../../components/ui/toast/use-toast";
import {resendOTP} from "@/api/auth/auth"
import ErrorCode from "@/enums/errorCode";

//variable declarations
const device = useDevice()
const config = useRuntimeConfig();
const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";
const SITE_KEY = config.public.SITE_KEY
const { toast } = useToast();
const userStore = useUserStore();
const firstName = ref<string>();
const lastName = ref<string>();
const password = ref<string>("");
const retypePassword = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const loading = ref(false);
const showPassword = ref(false);
const signUpAbled = ref(false)
const secondPassword = ref(false);
const showSpinner = ref(false)
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputType = computed(() => (showPassword.value ? "text" : "password"));
const inputTypeTwo = computed(() => (secondPassword.value ? "text" : "password"));
const toggleVisibility = (e: Event) => {
  showPassword.value = !showPassword.value;
};
const toggleSecondVisibility = (e: Event) => {
  secondPassword.value = !secondPassword.value;
};

//utility function

const enableButton = ()=>{
  setTimeout(() => {
        signUpAbled.value = false
      }, 5000);
}

// do not delete
//api calls
const otpResend = async () => {
  const mail = email.value;
  try {
    loading.value = true;
    const res = await resendOTP({
      apiUrl: API_URL,
      mail
    })
    loading.value = false;
  } catch (err: any) {
    loading.value = false;
    toast({
      title: "Unable to Resend OTP at this time",
    });
  }
};


const submitSignUp = async (e: Event) => {
  e.preventDefault();

  const newMail: string = email.value;
  if (!emailRegex.test(newMail)) {
    toast({ title: "Invalid email" });
  } else if (password.value != retypePassword.value) {
    toast({ title: "Passwords do not match " });
  }
  else if(password.value.length < 6 ){
    toast({ title: " password must be at least 6 characters long" })
  }

  else {
    const body = {
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      email: email.value,
      phoneNumber: phone.value,
    };

    try {
      loading.value = true;
      showSpinner.value=true;
      const res = await axios.post<LoginResponse<IUser>>(
        `${API_URL}/auth/creator-signup`,
        body
      );
      if (res.data.data.user) {
        userStore.setUser(res.data.data.user);
        navigateTo("creator/verifyEmail", { replace: true });
      }
      loading.value = false;
      showSpinner.value=false
      
    } catch (error: any) {
      loading.value = false;
      showSpinner.value=false

      if(error.response.data.code === ErrorCode.EMAIL_ALREADY_EXISTS){
        toast({ title: "User with this email already exists" });
        return
      }

      if (error.response.data.code === ErrorCode.UNVERIFIED_EMAIL) {
        await otpResend();
        userStore.setUser({ email: email.value });
        navigateTo("/creator/verifyEmail", { replace: true });
        return;
      }

      if (error.response.data.code === ErrorCode.INACTIVE_ACCOUNT){
        toast({title : "This Account is inactive"})
        return
      }
      toast({ title: error.response.data.message || "Error Signing Up" });
    }
  }
};
</script>

<template>
    <!-- loading spinner -->
    <div v-if="showSpinner"  class="  w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-black/50 flex justify-center items-center">
      <LoadSpinner />
    </div>
    
    <div class="py-4">
      <nuxt-link to="/creator/login">
        <signBlackButton message="Login" />
      </nuxt-link>

      <div class="px-1 md:px-16 mb-12">
        <h2 class="text-3xl font-semibold">Create New Account</h2>
      </div>

      <form @submit="submitSignUp" action="#" class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row gap-4 w-full px-1 md:px-16">
          <div class="flex flex-col w-full md:w-1/2">
            <label for="">First Name</label>
            <input
              v-model="firstName"
              type="text"
              placeholder=""
              class="border bg-transparent rounded border-black py-3 px-2"
              required
            />
          </div>

          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Last Name</label>
            <input
              v-model="lastName"
              type="text"
              placeholder=""
              class="border bg-transparent rounded border-black py-3 px-2"
              required
            />
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4 w-full px-4 md:px-16">
          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Email Address </label>
            <input
              v-model="email"
              type="email"
              placeholder=""
              class="border bg-transparent rounded border-black py-3 px-2"
              required
            />
          </div>

          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Phone number</label>
            <input
              v-model="phone"
              type="text"
              placeholder=""
              class="border bg-transparent rounded border-black py-3 px-2"
              required
            />
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4 w-full px-4 md:px-16">
          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Password</label>
            <div
              class="flex justify-between items-center border p-3 border-1 border-black rounded-md"
            >
              <input
                :type="inputType"
                class="w-full outline-none bg-transparent pl-2"
                v-model="password"
              />
              <button type="button" @click="toggleVisibility">
                {{ showPassword ? "" : "" }} <img src="/public/icons/eye.svg" alt="" />
              </button>
            </div>
          </div>

          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Re-enter Password</label>
            <div
              class="flex justify-between items-center border p-3 border-1 border-black rounded-md"
            >
              <input
                :type="inputTypeTwo"
                class="w-full bg-transparent outline-none pl-2"
                v-model="retypePassword"
              />
              <button type="button" @click="toggleSecondVisibility">
                {{ secondPassword ? "" : "" }}
                <img src="/public/icons/eye.svg" alt="" />
              </button>
            </div>
          </div>
        </div>

        <!-- <nuxt-link to="creator/verifyEmail">
                  <authButton message="Create Account" />
              </nuxt-link> -->

        <div class="px-4 md:px-16">
          <div class="cf-turnstile" data-sitekey=SITE_KEY></div>
        <button
          :disabled="signUpAbled"
          type="submit"
          class="flex justify-center items-center gap-2 rounded bg-[#5331E8] py-4 w-full text-white"
    
        >
        <p> Create Account</p>
          <Spinner :loading="loading" />
        </button>
      </div>
      </form>
    </div>



</template>
