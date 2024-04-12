<template>

    <div ref="container" class="flex gap-4 items-center">
        <input v-for="n in length" :key="n" 
            @keyup="(e) => handleEnter(e, n-1)"
            v-model="otpArray[n-1]" type="text" maxlength="1"
            class="border border-purple1 rounded-md p-2 w-[100px] text-3xl h-[100px] text-center"
        >
    </div>

</template>

<script setup>
import {ref} from "vue"

const otpProps = defineProps({
    length:{
        type:Number,
        default: 4
    }
})


const otpArray = ref([])
const container = ref()

function handleEnter(e,i){
    const children = container.value.children
    const keypressed = e.key
    console.log(keypressed)
    if(i > 0 && (keypressed==='Backspace' || keypressed==='Delete')){
        otpArray.value[i] = null
        setTimeout(() => {
            children[i-1].focus()
        }, 50);
        
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
    }
}
</script>