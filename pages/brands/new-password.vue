
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
const showPassword = ref(false)
const {resendOtp, confirmPasswordReset, isCooldown} = useBrandAuth()

    const validationSchema = toTypedSchema(
    zod.object({
        otp: zod.string().min(6, { message: 'This is required' }).max(6, { message: 'Must be a valid 6 digit code' }),
        newPassword: zod.string().min(8, { message: 'must be at least 8 characters ' })
    })
    );
    const { handleSubmit, errors } = useForm({
    validationSchema,
    });
    const { value: otp } = useField('otp');
    const { value: newPassword } = useField('newPassword');


    const resend =(emailAddress:string)=>{
        const form ={email : emailAddress}
        resendOtp(form)
    }
    const onSubmit = handleSubmit(values => {
    // Merge values with the unverified email
    const formData = {
        ...values,
        email: userStore.unverifiedEmail,
    }

    console.log(formData)

    confirmPasswordReset(formData)
    })

</script>
<template>
    <div class="flex items-center w-full justify-center flex-col gap-3">
        <div class="flex flex-col mt-10 md:mt-0 items-center text-center">
            <h1 class="font-bold text-2xl">Change your password</h1>
            <p class="font-thin">We just sent a 6 digit otp to {{userStore.unverifiedEmail ?  userStore.unverifiedEmail  : "" }} enter it below</p>
        </div>

        <div class="border  p-8 md:w-[500px] w-full mt-10 md:mt-0  flex flex-col gap-2 rounded-[8px] border-[#DEDFE6]">
         <form class="flex flex-col gap-2" @submit="onSubmit">
            <div  class="flex flex-col gap-1">
                <label class="text-xs" for="otp">otp* </label>
                <input name="otp" v-model="otp" class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2" type="text" placeholder="123456" />
                <span class="text-red-500 text-sm">{{ errors.otp }}</span>
            </div>
            <div class="flex flex-col gap-1 relative">
                <label class="text-xs" for="newPassword">New password*</label>

                <input
                name="newPassword"
                v-model="newPassword"
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

                <span class="text-red-500 text-sm">{{ errors?.newPassword }}</span>
            </div>

           
            <button class="w-full text-white py-3 font-thin text-xs rounded-[4px] bg-purple1">
                Verify email
            </button>
        </form>
        <span class="text-center text-sm w-full">Didn't see a code? <button :disabled="isCooldown" @click="resend(userStore?.unverifiedEmail)" class="text-purple1 underline"  >Resend to email</button> </span>
    </div>
    </div>
</template>