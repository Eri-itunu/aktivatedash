
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


    const validationSchema = toTypedSchema(
    zod.object({
        code: zod.string().min(6, { message: 'This is required' }).email({ message: 'Must be a valid 6 digit code' }),

    })
    );
    const { handleSubmit, errors } = useForm({
    validationSchema,
    });
    const { value: code } = useField('code');



    const onSubmit = handleSubmit(values => {
        console.log(values)
        

    });

</script>
<template>
    <div class="flex items-center w-full justify-center flex-col gap-3">
        <div class="flex flex-col mt-10 md:mt-0 items-center">
            <h1 class="font-bold text-2xl">Verify your email</h1>
            <p class="font-thin">We just sent a 6 digit code to ******* enter it below</p>
        </div>

        <div class="border  p-8 md:w-[500px] mt-10 md:mt-0  flex flex-col gap-2 rounded-[8px] border-[#DEDFE6]">
         <form class="flex flex-col gap-2" @submit="onSubmit">
            <div  class="flex flex-col gap-1">
                <label class="text-xs" for="code">Brand name* </label>
                <input name="code" v-model="code" class="border bg-transparent rounded-[4px] border-[#9A9898]/50 p-2" type="text" placeholder="123456" />
                <span class="text-red-500 text-sm">{{ errors.code }}</span>
            </div>

           
            <button class="w-full text-white py-3 font-thin text-xs rounded-[4px] bg-purple1">
                Verify email
            </button>
        </form>
        <span class="text-center text-sm w-full">Didn't see a code? <nuxt-link class="text-purple1 underline" to="/brand" >Resend to email</nuxt-link> </span>
    </div>
    </div>
</template>