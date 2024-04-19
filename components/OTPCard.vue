
<script setup lang="ts">

import UserRoles from "../enums/userRoles";
import type { ResponseMessage } from "types";
import {ref, type VNode } from "vue"

// TODO- fix env and remove local url
const API_URL = process.env.API_URL || "http://localhost:3333/api/v2"

const otpProps = defineProps({
    length:{
        type:Number,
        default: 6
    }
})

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
        <input v-for="n in length" :key="n"
            @keyup="(e) => handleEnter(e, n-1)"
            v-model="otpArray[n-1]" type="text" maxlength="1"
            class="border border-purple1 rounded-md p-2 w-[70px] text-3xl h-[70px] text-center"
        >
    </div>
    <Spinner :loading="loading" />
</template>