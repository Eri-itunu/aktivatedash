<script lang="ts" setup>
definePageMeta({
  layout: "brands-auth",
  colorMode: "light"
});
// imports
import { ref } from "vue";
import type { ResponseMessage } from "types";
import { useToast } from "@/components/ui/toast/use-toast";
import { resetPassword } from "@/api/auth/auth";

//variable decalrations
const route = useRoute();
const { email } = route.params as { email: string };
const device = useDevice()
const loading = ref(false);
const password = ref<string>("");
const retypePassword = ref<string>("");
const showPassword = ref(false);
const secondPassword = ref(false);
const OTP = ref<string[]>([]);
const userStore = useUserStore();
const { toast } = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const handleComplete = (e: string[]) => alert(e.join(''))
const { forgotemail } = storeToRefs(userStore);
const inputType = computed(() => (showPassword.value ? "text" : "password"));
const inputTypeTwo = computed(() => (secondPassword.value ? "text" : "password"));
const toggleVisibility = (e: Event) => {
  showPassword.value = !showPassword.value;
};
const toggleSecondVisibility = (e: Event) => {
  secondPassword.value = !secondPassword.value;
};


// api calls
const resetEmail = async (e: Event) => {
  e.preventDefault();
  try {
    if (!email) {
      toast({ title: "Cannot reset password at this time. Please try again later" });
      return;
    }
    if (!OTP.value || !password.value || !retypePassword.value) {
      return;
    }
    if (password.value.length < 6){
      toast({ title: "Passwords needs to be longer than 6 characters" });
      return;
    }
    if (password.value !== retypePassword.value) {
      toast({ title: "Passwords do not match" });
      return;
    }
    const otp = OTP.value.join('')
    //old implementation
    // const res = await $fetch<ResponseMessage>(`${API_URL}/auth/reset-password`, {
    //   method: "post",
    //   body: { email: forgotemail.value, otp, newPassword: password.value },
    // });

    const res = await resetPassword({
      apiUrl:API_URL as string,
      email:email,
      otp,
      newPassword:password.value
    })

    toast({ title: res });
    setTimeout(() => {
      navigateTo("/brands");
    }, 3000);
  } catch (error: any) {
    toast({ title: error.data?.message || "Unable to Reset Password. Please try again" });
  }
};
</script>

<template>

  <div class="flex flex-col justify-center items-center text-black">
    <nuxt-link class="flex justify-start " to="/brands">
      Back
    </nuxt-link>

    <div class="px-1 md:px-16 mb-24 flex flex-col gap-6">
      <h2 class="text-3xl font-semibold">Set Password</h2>
    </div>

    <form @submit="resetEmail">
      <div class="flex flex-col gap-5">
        <div class="px-4 md:px-16">
          <label for="OTP">OTP</label>
        <div class="w-full">
          <PinInput
            id="pin-input-2"
            v-model="OTP"
            placeholder="○"
            class="w-full"
          >
            <PinInputGroup class="w-full">
              <PinInputInput
                v-for="(id, index) in 6"
                :key="id"
                :index="index"
                class="w-full bg-transparent"
              />
            </PinInputGroup>
          </PinInput>
        </div>

        </div>

        <div class="flex gap-2 px-4 md:px-16">
          <div class="flex flex-col w-full md:w-1/2">
            <label for="">New Password </label>
            <div
              class="flex justify-between items-center border p-3 border-1 border-black rounded-md"
            >
              <input
                :type="inputType"
                class="w-full outline-none pl-2 bg-transparent"
                v-model="password"
                :placeholder="`enter password`"
                required
              />
              <button type="button" @click="toggleVisibility">
                {{ showPassword ? "" : "" }} <img src="/icons/eye.svg" alt="" />
              </button>
            </div>
          </div>
          <div class="flex flex-col w-full md:w-1/2">
            <label for="">Confirm Password </label>
            <div
              class="flex justify-between items-center border p-3 border-1 border-black rounded-md"
            >
              <input
                :type="inputTypeTwo"
                class="w-full outline-none pl-2 bg-transparent"
                v-model="retypePassword"
                :placeholder="`enter password`"
                required
              />
              <button type="button" @click="toggleSecondVisibility">
                {{ secondPassword ? "" : "" }}
                <img src="/icons/eye.svg" alt="" />
              </button>
            </div>
          </div>
        </div>

        <div class="pb-5 md:pb-0">
          <authButton type="submit" message="Confirm Password" :loading="loading" />
        </div>
      </div>
    </form>
  </div>


</template>
