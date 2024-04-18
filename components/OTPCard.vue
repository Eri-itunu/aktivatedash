
<script setup lang="ts">
import type { ResponseMessage } from "types";
import {ref} from "vue"
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

const otpArray = ref<string[] | null[]>([])
const container = ref()

const submitOTP = async() => {
    const email = userStore.user?.email;
    try {
        console.log("hit")
        const res = await $fetch<ResponseMessage>(`${API_URL}/auth/verify-email`, {
            method: 'post',
            body: {
                email,
                otp: otpArray.value.join("")
            }
        })
        toast.add({ title: res.message })
    } catch (err: any) {
        if(err.data.message) {
            toast.add({ title: err.data.message})
        }
    }
}

async function handleEnter (e,i){
    const children = container.value.children
    const keypressed = e.key
    console.log(keypressed)
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
        if(i === length-1) {
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

</template>