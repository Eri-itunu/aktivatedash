<script setup lang="ts">
import type { IUser, LoginResponse, ResponseMessage } from "types";
import axios from "axios";
import { useToast } from "../../components/ui/toast/use-toast";

const config = useRuntimeConfig();
const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";
// For Nuxt 3
definePageMeta({
  colorMode: "light",
});
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
const resendOTP = async () => {
  try {
    loading.value = true;
    const res = await $fetch<ResponseMessage>(`${API_URL}/auth/resend-otp`, {
      method: "post",
      body: {
        email,
      },
    });
  } catch (err: any) {
    toast({ title: "Unable to Resend OTP at this time" });
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

      toast({ title: "Error signing up" });
    }
  }
};
</script>

<template>
  <div class="py-4 hidden md:block">
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


  <div class="md:hidden">
    <div class=" px-4 py-2 border-[#EAEAEB] flex justify-center items-center text-center w-full border-b-[1px]">
      <h1 class="text-center font-bold">Create your account </h1>
    </div>
    <div class="p-8">
      <p class="text-3xl font-thin">Sign up</p>
      <p class="text-[#65678C] font-thin">Already have an account? Please <nuxt-link  to="/creator/login" class="text-purple1 font-semibold">log in</nuxt-link></p>
    </div>

    <div class="p-8 flex w-full">
      <form @submit="submitSignUp" class = "flex flex-col gap-4 w-full">
        <label for="First Name">First Name</label>
        <input type="text" v-model="firstName" class="rounded-[6px] border-[1px] p-3 w-full" placeholder="Enter first name">

        <label for="Last Name">Last Name</label>
        <input type="text" v-model="lastName" class="rounded-[6px] border-[1px] p-3 w-full" placeholder="Enter last name">

        <label for="Email Address">Email address</label>
        <input type="text" v-model="email" class="rounded-[6px] border-[1px] p-3 w-full" placeholder="Enter email address">

        <label for="Phone Number">Phone Number</label>
        <input type="text" v-model="phone" class="rounded-[6px] border-[1px] p-3 w-full" placeholder="Enter Phone Number">

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
</template>
