
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
const {brandLogin, isLogging} = useBrandAuth();



    const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
        password: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short to be valid' }),
    })
    );
    const { handleSubmit, errors } = useForm({
    validationSchema,
    });
    const { value: email } = useField('email');
    const { value: password } = useField('password');



    const onSubmit = handleSubmit(values => {
      console.log(values)
      brandLogin(values)
    });

</script>
<template>
    <div class="flex items-center w-full justify-center mt-10 flex-col gap-3">
        <div class="flex flex-col items-center mt-10 md:mt-0">
            <h1 class="font-bold text-2xl">Sign in</h1>
            <p class="font-thin">Welcome back</p>
        </div>

        <div class="border p-2 md:p-8 md:w-[500px] w-full mt-10 md:mt-0 flex flex-col gap-2 rounded-[8px] border-[#DEDFE6]">
         <form class="flex flex-col gap-2" @submit="onSubmit">
           

            <div  class="flex flex-col gap-1">
                <label class="text-xs" for="email">Email*</label>
                <input name="email" v-model="email" type="email" class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2"  placeholder="user@yahoo.com"/>
                <span class="text-red-500 text-sm">{{ errors.email }}</span>
            </div>

           
            <div  class="flex flex-col gap-1">
                <label class="text-xs" for="password">Password*</label>
                <input name="password" v-model="password" class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2" type="password" placeholder="*********" />
                <span class="text-red-500 text-sm" >{{ errors.password }}</span>
            </div>

           
            <button
  type="submit"
  :disabled="isLogging"
              class="w-full py-4 font-thin text-xs rounded-[4px] transition-colors duration-200 flex justify-center items-center
                text-white
                bg-purple1
                disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <template v-if="isLogging">
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
                Log in
              </template>
            </button>
        </form>
        <nuxt-link to="/brands/forgot-password"  class="text-purple1 w-full text-center text-sm" >Forgot password?</nuxt-link>
        <span class="text-center text-sm w-full">Don't have an account? <nuxt-link class="text-purple1 underline" to="/brands/onboarding" >Sign up</nuxt-link> </span>
    </div>
    </div>
</template>