<script setup lang="ts">
import type { ResponseMessage } from "types";

const config = useRuntimeConfig();
const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";
import { useToast } from "../../components/ui/toast/use-toast";
definePageMeta({
  colorMode: "light",
});
const userStore = useUserStore();
const { toast } = useToast();
const loading = ref(false);
const count = ref(175);
const disabled = ref(true);
const otp = ref("");

const countdown = () => {
  let timer = setInterval(function () {
    if (count.value <= 1) {
      disabled.value = false;
      clearInterval(timer);
    }
    count.value -= 1;
  }, 1000);
};
countdown();

const resendOTP = async () => {
  const email = userStore.user?.email;
  if (!email) {
    console.error("No email provided");
  }
  try {
    loading.value = true;
    const res = await $fetch<ResponseMessage>(`${API_URL}/auth/resend-otp`, {
      method: "post",
      body: {
        email,
      },
    });
    loading.value = false;
    toast({ title: "Please check your email for the new otp" });
    count.value = 120;
    disabled.value = true;
    countdown();
  } catch (err: any) {
    toast({ title: "Unable to Resend OTP at this time" });
  }
};

const submitOTP = async (e: Event) => {
  e.preventDefault();
  const email = userStore.user?.email;
  if (!email) {
    console.error("No email provided");
  }
  try {
    loading.value = true;
    const res = await $fetch<ResponseMessage>(`${API_URL}/auth/verify-email`, {
      method: "post",
      body: {
        email,
        otp: otp.value,
      },
    });
    loading.value = false;
    toast({ title: "Email Verification Successful", description: "You can now log in" });
    setTimeout(() => {
      navigateTo("/creator/login");
    }, 2000);
  } catch (err: any) {
    toast({ title: err.data?.message || "Something went wrong" });
  }
};
</script>

<template>
  <form class="hidden md:block">
    <div class="flex flex-col gap-10 pb-5">
      <nuxt-link to="/creator/login">
        <signBlackButton message="Login" />
      </nuxt-link>
      <div class="px-2 md:px-16 mb-12 flex flex-col gap-5">
        <h2 class="text-3xl font-semibold">Verify Email Address</h2>
        <p>
          Enter the OTP sent to {{ userStore.user?.email || userStore.unverifiedEmail }}
        </p>
      </div>

      <div class="px-2 md:px-16">
        <div class="flex items-center justify-center w-full">
          <input
            type="text"
            maxlength="6"
            min="6"
            max="6"
            required
            v-model="otp"
            class="w-full text-center md:w-1/3 border-2 border-purple1 rounded-lg p-2"
          />
        </div>
        <div class="flex justify-end">
          <p class="font-bold">
            OTP expires in:
            <span class="text-purple1 font-bold">{{ count }} seconds</span>
          </p>
        </div>
      </div>

      <div class="px-2 md:px-16 flex gap-2">
        <button
          type="submit"
          @click="submitOTP"
          class="px-4 py-2 rounded border-2 border-purple1"
        >
          <p class="text-purple1">Verify Email</p>
        </button>

        <button
          :disabled="disabled"
          type="button"
          @click="resendOTP"
          class="px-4 py-2 rounded border-2 border-purple1 disabled:opacity-30"
        >
          <p class="text-purple1">Resend OTP</p>
        </button>
      </div>
    </div>
  </form>
</template>
