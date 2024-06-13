
<script setup lang="ts">

import UserRoles from "../enums/userRoles";
import type { ResponseMessage } from "types";
import {ref, type VNode } from "vue"

const config = useRuntimeConfig()

const API_URL = config.public.API_URL

const otpProps = defineProps({
    length:{
        type:Number,
        default: 6
    },
    disabled:{
        type:Boolean,
        default:false
    }
})

const error = ref(false)

const toast = useToast();
const userStore = useUserStore();
const loading = ref(false)

const otpArray = ref<string[] | null[]>([])
const container = ref<VNode>()



const submitOTP = async() => {
    const email = userStore.user?.email;
    try {
        loading.value = true
        const res = await $fetch<ResponseMessage>(`${API_URL}/auth/verify-email`, {
            method: 'post',
            // @ts-expect-error
            body: { email, otp: otpArray.value.join("")  }
        })
        loading.value = false;
        toast.add({ title: res.message })
        if(res.error) {
            return
        }
        if( userStore.user?.role_id === UserRoles.CREATOR) {
            navigateTo("/creator/login", { replace: true })
        }
    } catch (err: any) {
        loading.value = false
        error.value = true
        if(err.data.message) {
            toast.add({ title: err.data.message})
        }
    }
}

async function handleEnter (e: KeyboardEvent, i: number){
    const children = container.value?.children
    const keypressed = e.key
    if(!children) {
        return
    }
    if(i > 0 && (keypressed==='Backspace' || keypressed==='Delete')){
        otpArray.value[i] = null
        setTimeout(() => {
            children[i-1].focus()
        }, 0);
    }

    else {
        const matched = keypressed.match(/^[0-9]$/)
        if(!matched){
            otpArray.value[i] = null
            return
        }

        else if(i < otpProps.length -1){
            children[i+1].focus()
        }
        if(i === 5) {
            console.log("what is here")
            await submitOTP();
        }
    }
}
</script>


<template>

    <div ref="container" class="flex justify-between items-center">
        <input :disabled="disabled" v-for="n in length" :key="n"
            @keyup="(e) => handleEnter(e, n-1)"
            v-model="otpArray[n-1]" type="text" maxlength="1"
            class="border border-purple1 rounded-md p-2 w-[40px] md:w-[70px] text-3xl h-[40px] md:h-[70px] text-center"  :class="{'border border-red rounded-md p-2 w-[70px] text-3xl h-[70px] text-center': error}"
        >
    </div>
    <Spinner :loading="loading" />
</template>