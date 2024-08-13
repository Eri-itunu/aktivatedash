<script setup lang="ts">

//imports
import type { IUser, LoginResponse, ResponseMessage } from "types";
import axios from "axios";
import { useToast } from "../../components/ui/toast/use-toast";
import {resendOTP} from "@/api/auth/auth"

//variable declarations
const device = useDevice()
const config = useRuntimeConfig();
const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";
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
const secondPassword = ref(false);
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputType = computed(() => (showPassword.value ? "text" : "password"));
const inputTypeTwo = computed(() => (secondPassword.value ? "text" : "password"));
const toggleVisibility = (e: Event) => {
  showPassword.value = !showPassword.value;
};
const toggleSecondVisibility = (e: Event) => {
  secondPassword.value = !secondPassword.value;
};

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
      const res = await axios.post<LoginResponse<IUser>>(
        `${API_URL}/auth/creator-signup`,
        body
      );
      if (res.data.data.user) {
        userStore.setUser(res.data.data.user);
        navigateTo("creator/verifyEmail", { replace: true });
      }
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      toast({ title: error.data?.message || "Error Signing Up" });
    }
  }
};
</script>

<template>
    <div v-if="device.isMobile" class="md:hidden">
    <div class=" px-4 py-2 border-[#EAEAEB] flex justify-center items-center text-center w-full border-b-[1px]">
      <h1 class="text-center font-bold">Create your account </h1>
    </div>

    <div class="px-8 pb-4 pt-8">
      <img src="/assets/icons/AktivateAuthLogo.svg" class="h-[40px]" alt="">
    </div>

    <div class="px-8 pb-2">
      <p class="text-3xl font-thin">Sign up</p>
      <p class="text-[#65678C] font-thin">Already have an account? Please <nuxt-link  to="/creator/login" class="text-purple1 font-semibold">log in</nuxt-link></p>
    </div>

    <div class="px-8 flex w-full">
      <form @submit="submitSignUp" class = "flex flex-col gap-4 w-full">
        <label for="First Name">First Name</label>
        <input type="text" v-model="firstName" class="rounded-[6px] border-[1px] p-3 w-full" placeholder="Enter first name" required>

        <label for="Last Name">Last Name</label>
        <input type="text" v-model="lastName" class="rounded-[6px] border-[1px] p-3 w-full" placeholder="Enter last name" required>

        <label for="Email Address">Email address</label>
        <input type="text" v-model="email" class="rounded-[6px] border-[1px] p-3 w-full" placeholder="Enter email address" required>

        <label for="Phone Number">Phone Number</label>
        <input type="text" v-model="phone" class="rounded-[6px] border-[1px] p-3 w-full" placeholder="Enter Phone Number" required>

        <div class="flex gap-2 flex-col">
          <label for="Password">Password</label>
          <div
              class="flex justify-between items-center border p-3 border-1 rounded-md"
            >
              <input
                :type="inputType"
                class="w-full outline-none pl-2"
                v-model="password"
                :placeholder="`Enter password`"
                required
              />
              <button type="button" @click="toggleVisibility">
                {{ showPassword ? "" : "" }} <img src="../../assets/icons/eye.svg" alt="" />
              </button>
            </div>
         
        </div>

        <div class="flex gap-2 flex-col">
          <label for="Password">Password</label>
          <div
              class="flex justify-between items-center border p-3 border-1 rounded-md"
            >
              <input
                :type="inputTypeTwo"
                class="w-full outline-none pl-2"
                v-model="retypePassword"
                :placeholder="`Confirm password`"
                required
              />
              <button type="button" @click="toggleSecondVisibility">
                {{ secondPassword ? "" : "" }} <img src="../../assets/icons/eye.svg" alt="" />
              </button>
            </div>
      
        </div>

        <button type="submit" class=" px-4 py-4 flex justify-center rounded-[8px] bg-purple1 text-white">
          Go to dashboard
        </button>
        
      </form>
    </div>
  </div>
  <div v-else class="py-4">
    <nuxt-link to="/creator/login">
      <signBlackButton message="Login" />
    </nuxt-link>

    <div class="px-4 md:px-16 mb-12">
      <h2 class="text-3xl font-semibold">Create New Account</h2>
    </div>

    <form @submit="submitSignUp" action="#" class="flex flex-col gap-4">
      <div class="flex flex-col md:flex-row gap-4 w-full px-4 md:px-16">
        <div class="flex flex-col w-full md:w-1/2">
          <label for="">First Name</label>
          <input
            v-model="firstName"
            type="text"
            placeholder=""
            class="border rounded border-black py-3 px-2"
            required
          />
        </div>

        <div class="flex flex-col w-full md:w-1/2">
          <label for="">Last Name</label>
          <input
            v-model="lastName"
            type="text"
            placeholder=""
            class="border rounded border-black py-3 px-2"
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
            class="border rounded border-black py-3 px-2"
            required
          />
        </div>

        <div class="flex flex-col w-full md:w-1/2">
          <label for="">Phone number</label>
          <input
            v-model="phone"
            type="text"
            placeholder=""
            class="border rounded border-black py-3 px-2"
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
              class="w-full outline-none pl-2"
              v-model="password"
            />
            <button type="button" @click="toggleVisibility">
              {{ showPassword ? "" : "" }} <img src="../../assets/icons/eye.svg" alt="" />
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
              class="w-full outline-none pl-2"
              v-model="retypePassword"
            />
            <button type="button" @click="toggleSecondVisibility">
              {{ secondPassword ? "" : "" }}
              <img src="../../assets/icons/eye.svg" alt="" />
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
