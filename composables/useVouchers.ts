import type { Voucher, PaginationMeta } from 'types';
import { getMyVouchers, getCreatedVouchers } from '@/api/brand/voucher';
import { useToast } from "../components/ui/toast/use-toast";
const { toast } = useToast();
export const useVouchers = () => {
  const createdVouchers = ref<Voucher[]>([]);
  const createdVouchersMeta = ref<PaginationMeta>()
  const myVouchers = ref<Voucher[]>([]);
  const myVouchersMeta = ref<PaginationMeta>()
  const loading = ref(false);
  const error = ref<string | null>(null);
  const page = ref(1)

  const fetchVouchers = async (accessToken: string, apiUrl: string) => {
    loading.value = true;
    error.value = null;

    try {
      const [createdVouchersRes, myVouchersRes] = await Promise.all([
        getCreatedVouchers({ accessToken, apiUrl,page:page.value }),
        getMyVouchers({ accessToken, apiUrl,page:page.value }),
      ]);

      createdVouchers.value = createdVouchersRes.data;
      createdVouchersMeta.value = createdVouchersRes.meta;
      myVouchers.value = myVouchersRes.data;
      myVouchersMeta.value = myVouchersRes.meta;
    } catch (err: any) {
      toast({ title: err.message, variant: 'destructive', });
      error.value = err.message || 'Failed to fetch vouchers';
    } finally {
      loading.value = false;
    }
  };

  const toPage =(index:number)=>{
    page.value = index;
  }
  const nextPage =()=>{
    page.value++
  }
  const previousPage =()=>{
    page.value--
  }

  

  return {
    createdVouchers,
    myVouchers,
    loading,
    error,
    fetchVouchers,
    createdVouchersMeta,
    myVouchersMeta,
    toPage,
    nextPage,
    previousPage,
    page
  };
};
