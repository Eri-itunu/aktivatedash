import { getVoucherDetails } from "@/api/brand/voucher"

export const useVoucherStore = defineStore('voucher', () => {
    const config = useRuntimeConfig()
    const apiUrl = config.public.API_URL as string
    const voucherValue = ref(0)
    const voucherCode = ref<string>('')

    const saveDetails =async(accessToken:string, voucherId:string)=>{
      try{
        const res = await getVoucherDetails({ accessToken, apiUrl, voucherId })
        voucherValue.value=res.data.voucher.balance
        voucherCode.value = res.data.voucher.code
      }catch(error:any){
        throw new Error(error.message)
      }
    }
  return { voucherValue, voucherCode, saveDetails }
})