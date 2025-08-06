
<script setup lang="ts">
import UserRoles from "@/enums/userRoles";
import { useToast } from "../../components/ui/toast";
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

definePageMeta({
  layout: "brands-auth",
  colorMode: "light"
});
const { toast } = useToast();
const userStore = useUserStore();
const {authenticateBrand, pendingBrand, resendOtp, isCooldown} = useBrandAuth()

    const validationSchema = toTypedSchema(
    zod.object({
        otp: zod.string().min(6, { message: 'This is required' }).max( 6, { message: 'Must be a valid 6 digit otp' }),

    })
    );
    const { handleSubmit, errors } = useForm({
    validationSchema,
    });
    const { value: otp } = useField('otp');



    const onSubmit = handleSubmit(values => {
        const formData = {
            ...values,
            email: userStore.unverifiedEmail,
        }
        authenticateBrand(formData)

    });

    const resend=()=>{
      const formData = {
        email: userStore.unverifiedEmail
      }
      resendOtp(formData)
    }

  onMounted(() => {
    if (!userStore.unverifiedEmail) {
      navigateTo('/')
    }
  })

</script>
<template>
    <div class="flex items-center w-full justify-center flex-col gap-3">
        <div class="flex flex-col mt-10 md:mt-0 items-center justify-center text-center">
            <h1 class="font-bold text-2xl">Verify your email</h1>
            <p class="font-thin">We just sent a 6 digit code to {{userStore.unverifiedEmail}} enter it below</p>
        </div>

        <div class="border  p-8 md:w-[500px] w-full mt-10 md:mt-0  flex flex-col gap-2 rounded-[8px] border-[#DEDFE6]">
         <form class="flex flex-col gap-2" @submit="onSubmit">
            <div  class="flex flex-col gap-1">
                <label class="text-xs" for="code">OTP </label>
                <input name="code" v-model="otp" class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2" type="text" placeholder="123456" />
                <span class="text-red-500 text-sm">{{ errors.otp }}</span>
            </div>

           
            
            <button
                type="submit"
                :disabled="pendingBrand"
              class="w-full py-4 font-thin text-xs rounded-[4px] transition-colors duration-200 flex justify-center items-center
                text-white
                bg-purple1
                disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <template v-if="pendingBrand">
                <svg
                  class="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </template>
              <template v-else>
                Verify email
              </template>
            </button>
        </form>
        <span class="text-center text-sm w-full">Didn't see a code? <button
          :disabled="isCooldown"
          @click="resend"
          class="underline transition-colors duration-200"
          :class="isCooldown ? 'text-gray-400 cursor-not-allowed' : 'text-purple1 hover:text-purple-700'"
        >
          Resend to email
        </button> </span>
    </div>
    </div>
</template>