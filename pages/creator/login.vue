<script lang="ts" setup>
// For Nuxt 3
import type { IUser, LoginResponse, ResponseMessage } from "types";
import { useToast } from "../../components/ui/toast/use-toast";
import ErrorCode from "../../enums/errorCode";
definePageMeta({
  colorMode: "light",
  
});

import UserRoles from "../../enums/userRoles";
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
const inputType = computed(() => (showPassword.value ? "text" : "password"));
const resendOTP = async () => {
  const mail = email.value;
  try {
    loading.value = true;
    const res = await $fetch<ResponseMessage>(`${API_URL}/auth/resend-otp`, {
      method: "post",
      body: {
        email: mail,
      },
    });
  } catch (err: any) {
    toast({
      title: "Unable to Resend OTP at this time",
    });
  }
};

const submitLogin = async (e: Event) => {
  const body = {
    password: password.value,
    email: email.value,
  };
  loading.value = true;
  try {
    await userStore.login(body);

    if (userStore.user && userStore.user.role_id === UserRoles.CREATOR) {
      loading.value = false;
      navigateTo("/creator/dashboard");
      return;
    }
    throw new Error("Invalid Credentials");
  } catch (error: any) {
    loading.value = false;
    if (error.message === ErrorCode.UNVERIFIED_EMAIL) {
      await resendOTP();
      navigateTo("/creator/verifyEmail", { replace: true });
      return;
    }
    toast({
      title: error.message,
    });
  }
};
</script>

<template>
  <div>
    <div class="basis-1/3">
      <nuxt-link to="/creator">
      <div class="p-4">
        <signBlackButton message="Sign Up" />
      </div>
      </nuxt-link>

      <div class="px-4 md:px-16 mb-24 flex flex-col gap-6">
        <h2 class="text-3xl font-semibold">Login to your Account</h2>
        <p class="text-[#6D6B76]">Login to your Aktivate Creator account</p>
      </div>
    </div>

    <div class="flex flex-col justify-center gap-2 basis-2/3">
      <div>
        <div class="flex flex-col items-center md:flex-row gap-4 w-full px-4 md:px-16">
          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Email </label>
            <input
              v-model="email"
              type="email"
              placeholder="Your Email Address"
              class="border rounded border-black py-3 px-2"
            />
          </div>
          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Password </label>
            <div
              class="flex justify-between items-center border p-3 border-1 border-black rounded-md"
            >
              <input
                :type="inputType"
                class="w-full outline-none pl-2"
                v-model="password"
                :placeholder="`enter password`"
                @keyup.enter="submitLogin"
              />
              <button type="button" @click="toggleVisibility">
                {{ showPassword ? "" : "" }} <img src="../../assets/icons/eye.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-end px-4 md:px-16">
          <nuxt-link to="/creator/forgot-password">
            <button class="text-[#6D6B76]">Forgot Password?</button>
          </nuxt-link>
        </div>
      </div>

      <!-- <nuxt-link class="pb-5 md:pb-0" to="/dashboard">
                  <authButton message="Go To Dashboard "/>
              </nuxt-link> -->
      <div @click="submitLogin" class="pb-5 md:pb-0">
        <authButton @click="submitLogin" message="Go To Dashboard" :loading="loading" />
      </div>
    </div>
  </div>
</template>
