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

const { brandSignUp, isPending } = useBrandAuth();
const route = useRoute();
const showPassword = ref(false);

// ✅ Access referer from query
const initialReferer = route.query.referer ?? '';

// ✅ Validation schema
const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    password: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short to be valid' }),
    brandName: zod.string().min(1, { message: 'This is required' }),
    contactPersonName: zod.string().min(1, { message: 'User name is required' }),
    contactPersonPhone: zod.string().min(11, { message: 'Enter a valid number' }).max(11, { message: 'Enter a valid number' }),
    referrer: zod.string().optional(), // ✅ optional referer
    acceptTerms: zod.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms' })
    }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    referrer: initialReferer ||'' 
  }
});

const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: brandName } = useField('brandName');
const { value: contactPersonName } = useField('contactPersonName');
const { value: contactPersonPhone } = useField('contactPersonPhone');
const { value: referrer } = useField('referrer'); 
const { value: acceptTerms, errorMessage: termsError } = useField('acceptTerms');

const onSubmit = handleSubmit(values => {
  const { acceptTerms, ...formData } = values;
  brandSignUp(formData);
});
</script>

<template>
    <div class="flex items-center w-full justify-center flex-col gap-3">
        <div class="flex flex-col items-center mt-10 md:mt-0">
            <h1 class="font-bold text-2xl">Welcome to Aktivate</h1>
            <p class="font-thin">Please sign up below</p>
        </div>

        <div class="border p-2 m:p-8 md:w-[500px] mt-10 md:mt-0 flex flex-col gap-2 rounded-[8px] border-[#DEDFE6]">
         <form class="flex flex-col gap-2" @submit="onSubmit">
            <div  class="flex flex-col gap-1">
                <label class="text-xs" for="brandName">Brand name </label>
                <input name="brandName" v-model="brandName" class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2" type="text" placeholder="cocacola" />
                <span class="text-red-500 text-sm">{{ errors.brandName }}</span>
            </div>

            <div  class="flex flex-col gap-1">
                <label class="text-xs" for="email">Email</label>
                <input name="email" v-model="email" type="email" class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2"  placeholder="joy_eziamaka@yahoo.com"/>
                <span class="text-red-500 text-sm">{{ errors.email }}</span>
            </div>

            <div  class="flex flex-col gap-1">
                <label class="text-xs" for="contactPersonName">Contact person's name</label>
                <input name="contactPersonName" v-model="contactPersonName" class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2" type="text" placeholder="Akin Asalu" />
                <span class="text-red-500 text-sm">{{ errors.contactPersonName }}</span>
            </div>

            <div class="flex flex-col gap-1">
                <label class="text-xs" for="contactPersonPhone">Phone number</label>
                <input name="contactPersonPhone" v-model="contactPersonPhone" class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2" type="text" placeholder="09055883388" />
                <span class="text-red-500 text-sm">{{ errors.contactPersonPhone }}</span>
            </div>

            <div class="flex flex-col gap-1 relative">
                <label class="text-xs" for="password">Password</label>

                <input
                name="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="*********"
                class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2 pr-10"
                />

                <!-- Toggle visibility icon/button -->
                <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-2 top-8 text-xs text-gray-500"
                >
                {{ showPassword ? 'Hide' : 'Show' }}
                </button>

                <span class="text-red-500 text-sm">{{ errors?.password }}</span>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs" for="referer">Referer (optional)</label>
              <input
                name="referrer"
                v-model="referrer"
                class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2"
                type="text"
                placeholder="e.g. Akinola"
              />
              <span class="text-red-500 text-sm">{{ errors.referrer }}</span>
            </div>

            <div>
                <label class="flex items-center space-x-2">
                    <input class="bg-transparent" v-model="acceptTerms" type="checkbox" />
                    <span class="text-sm">I agree to the Aktivate privacy policy and terms of service.</span>
                </label>
                <p class="text-red-500 text-sm">{{ termsError }}</p>
            </div>
           
            
            <button
                type="submit"
                :disabled="isPending"
              class="w-full py-4 font-thin text-xs rounded-[4px] transition-colors duration-200 flex justify-center items-center
                text-white
                bg-purple1
                disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <template v-if="isPending">
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
                Create Account
              </template>
            </button>
        </form>
        <span class="text-center text-sm w-full">Already have an account? <nuxt-link class="text-purple1 underline" to="/brand" >Log in</nuxt-link> </span>
    </div>
    </div>
</template>