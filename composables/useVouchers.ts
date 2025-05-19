import type { Voucher, PaginationMeta } from 'types';
import { getMyVouchers, getCreatedVouchers } from '@/api/brand/voucher';
import { useToast } from "../components/ui/toast/use-toast";
const { toast } = useToast();
const config = useRuntimeConfig()
const apiUrl = config.public.API_URL as string
const userStore = useUserStore()
const accessToken = userStore.accessToken as string
export const useVouchers = () => {
  const createdVouchers = ref<Voucher[]>([]);
  const createdVouchersMeta = ref<PaginationMeta>()
  const myVouchers = ref<Voucher[]>([]);
  const myVouchersMeta = ref<PaginationMeta>()
  const loading = ref(false);
  const error = ref<string | null>(null);
  const assignedPage = ref(1)
  const createdPage = ref(1)

  const fetchCreatedVouchers = async () => {
    loading.value = true;
    try {
      const res = await getCreatedVouchers({ accessToken, apiUrl, page: createdPage.value });
      createdVouchers.value = res.data;
      createdVouchersMeta.value = res.meta;
    } catch (err: any) {
      toast({ title: err.message, variant: 'destructive' });
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  const fetchMyVouchers = async () => {
    loading.value = true;
    try {
      const res = await getMyVouchers({ accessToken, apiUrl, page: assignedPage.value });
      myVouchers.value = res.data;
      myVouchersMeta.value = res.meta;
    } catch (err: any) {
      toast({ title: err.message, variant: 'destructive' });
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  

  const toPage = async (index: number, type: string) => {
    if (type === 'created') {
      createdPage.value = index;
      await fetchCreatedVouchers();
    } else {
      assignedPage.value = index;
      await fetchMyVouchers();
    }
  };
  
  const nextPage =async(type:string)=>{
    
    if(type == 'created'){
      createdPage.value++
      await fetchCreatedVouchers();
    }
    else{
      assignedPage.value++
      await fetchMyVouchers();
    }
   
  }
  const previousPage =async(type:string)=>{
    if(type == 'created'){
      createdPage.value--
      await fetchCreatedVouchers();
    }
    else{
      assignedPage.value--
      await fetchMyVouchers();
    }
  
    
  }

  

  return {
    createdVouchers,
    myVouchers,
    loading,
    error,
    fetchCreatedVouchers,
    fetchMyVouchers,
    createdVouchersMeta,
    myVouchersMeta,
    toPage,
    nextPage,
    previousPage,
    assignedPage,
    createdPage
  };
};
