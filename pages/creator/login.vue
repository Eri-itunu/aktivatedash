<script lang="ts" setup>
// For Nuxt 3
//imports
import type { IUser, LoginResponse, ResponseMessage } from "types";
import {resendOTP} from "@/api/auth/auth"
import { useToast } from "../../components/ui/toast/use-toast";
import ErrorCode from "../../enums/errorCode";
import UserRoles from "../../enums/userRoles";

//variable declarations
const device = useDevice()
const { toast } = useToast();
const userStore = useUserStore();
const email = ref<string>("");
const password = ref<string>("");
const loading = ref(false);
const showPassword = ref(false);
const toggleVisibility = (e: Event) => {
  showPassword.value = !showPassword.value;
};
const config = useRuntimeConfig();
const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";
const SITE_KEY = config.public.SITE_KEY
const inputType = computed(() => (showPassword.value ? "text" : "password"));

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

const submitLogin = async (e: Event) => {
  e.preventDefault();
  if (password.value === "" || email.value === ""){
    toast({
      title: "Enter valid credentials",
    });
    return 
  }
  const body = {
    password: password.value,
    email: email.value,
  };
  loading.value = true;
  try {
    await userStore.login(body);
   

    if (userStore.user && userStore.user.roleId === UserRoles.CREATOR) {
      loading.value = false;
      navigateTo("/creator/dashboard");
      return;
    }
    throw new Error("Invalid Credentials");
  
  } catch (error: any) {
    loading.value = false;
    if (error.message === ErrorCode.UNVERIFIED_EMAIL) {
      await otpResend();
      userStore.setUser({ email: email.value });
      navigateTo("/creator/verifyEmail", { replace: true });
      return;
    }
    toast({
      title: error.message,
    });
  }
};

const submitMobileLogin = async (e: Event) => {
  e.preventDefault();
  if (password.value === "" || email.value === ""){
    toast({
      title: "Enter valid credentials",
    });
    return 
  }
  const body = {
    password: password.value,
    email: email.value,
  };
  loading.value = true;
  try {
    await userStore.login(body);

    if (userStore.user && userStore.user.roleId === UserRoles.CREATOR) {
      loading.value = false;
      navigateTo("/creator/dashboard/platforms");
      return;
    }
    throw new Error("Invalid Credentials");
  } catch (error: any) {
    loading.value = false;
    if (error.code === ErrorCode.UNVERIFIED_EMAIL) {
      await otpResend();
      userStore.setUser({ email: email.value });
      navigateTo("/creator/verifyEmail", { replace: true });
      return;
    }
    toast({
      title: error.code,
    });
  }
};
</script>

<template>

  <div v-if="device.isMobile" >
    <div
      class="px-4 py-2 border-[#EAEAEB] flex justify-center items-center text-center w-full border-b-[1px]"
    >
      <h1 class="text-center font-bold">Enter your account</h1>
    </div>

    <div class="px-8 pt-8 pb-4">
      <img src="/assets/icons/AktivateAuthLogo.svg" class="h-[40px]" alt="">
    </div>

    <div class="px-8 py-2">
      <p class="text-3xl font-thin">Log in</p>
      <p class="text-[#65678C] font-thin">
        New to Aktivate? Please
        <nuxt-link to="/creator" class="text-purple1 font-semibold">sign up</nuxt-link>
      </p>
    </div>

    <div class="px-8 py-2 w-full">
      <form @submit="submitMobileLogin" class="flex flex-col gap-4 w-full">
        <div>
          <label for="Email Address">Email address</label>
          <input
            type="text"
            v-model="email"
            class="rounded-[6px] border-[1px] p-3 w-full"
            placeholder="Enter email address"
            required
          />
        </div>

        <div class="flex  flex-col">
          <label for="Password">Password</label>
          <div class="flex justify-between items-center border p-3 border-1 rounded-md">
            <input
              :type="inputType"
              class="w-full outline-none pl-2"
              v-model="password"
              :placeholder="`enter password`"
              required
            />
            <button type="button" @click="toggleVisibility">
              {{ showPassword ? "" : "" }} <img src="../../assets/icons/eye.svg" alt="" />
            </button>
          </div>
        </div>

        <nuxt-link to="/creator/forgot-password" class="text-purple1 text-sm font-semibold"
            >Forgot password?
        </nuxt-link>
        <div class="cf-turnstile" data-sitekey=SITE_KEY></div>

        <button
          type="submit"
          class="px-4 py-4 flex justify-center rounded-[8px] bg-purple1 text-white"
        >
          Go to dashboard
          <Spinner :loading="loading" />
        </button>

        <!-- <authButton type="submit" message="Go To Dashboard" :loading="loading" /> -->

      </form>
    </div>
  </div>

  <div v-else >
    <div class="basis-1/3">
      <nuxt-link to="/creator">
        <div class="p-4">
          <signBlackButton message="Sign Up" />
        </div>
      </nuxt-link>

      <div class="px-4 md:px-16 mb-24 flex flex-col gap-6">
        <h2 class="text-3xl text-black font-semibold">Login to your Account</h2>
        <p class="text-[#6D6B76]">Login to your Aktivate Creator account</p>
      </div>
    </div>

    <form @submit="submitLogin" class="flex flex-col justify-center gap-2 basis-2/3">
      <div>
        <div class="flex flex-col items-center md:flex-row gap-4 w-full px-4 md:px-16">
          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Email </label>
            <input
              v-model="email"
              type="email"
              placeholder="Your Email Address"
              class="border rounded border-black bg-transparent py-3 px-2"
              required
            />
          </div>
          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Password </label>
            <div
              class="flex justify-between items-center border p-3 border-1  border-black rounded-md"
            >
              <input
                :type="inputType"
                class="w-full outline-none pl-2 bg-transparent"
                v-model="password"
                :placeholder="`enter password`"
                required
              />
              <button type="button" @click="toggleVisibility">
                {{ showPassword ? "" : "" }}
                <img src="../../assets/icons/eye.svg" alt="" />
              </button>
            </div>
          </div>
        </div>

        
      </div>

      <!-- <nuxt-link class="pb-5 md:pb-0" to="/dashboard">
                  <authButton message="Go To Dashboard "/>
              </nuxt-link> -->

        <div class="flex justify-end px-4 md:px-16">
          <button type="button" @click="navigateTo('/creator/forgot-password')" class="text-[#6D6B76]">Forgot Password?</button>
        </div>

        <div class="cf-turnstile" data-sitekey="YOUR-SITE-KEY"></div>
      <div class="pb-5 md:pb-0">
        <authButton type="submit" message="Go To Dashboard" :loading="loading" />
      </div>
    </form>
  </div>

</template>
