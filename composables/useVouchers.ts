import type { Voucher } from 'types';
import { getMyVouchers, getCreatedVouchers } from '@/api/brand/voucher';
import { useToast } from "../components/ui/toast/use-toast";
const { toast } = useToast();
export const useVouchers = () => {
  const createdVouchers = ref<Voucher[]>([]);
  const myVouchers = ref<Voucher[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchVouchers = async (accessToken: string, apiUrl: string) => {
    loading.value = true;
    error.value = null;

    try {
      const [createdVouchersRes, myVouchersRes] = await Promise.all([
        getCreatedVouchers({ accessToken, apiUrl }),
        getMyVouchers({ accessToken, apiUrl }),
      ]);

      createdVouchers.value = createdVouchersRes.data.vouchers;
      myVouchers.value = myVouchersRes.data.vouchers;
    } catch (err: any) {
      toast({ title: err.message, variant: 'destructive', });
      error.value = err.message || 'Failed to fetch vouchers';
    } finally {
      loading.value = false;
    }
  };

  return {
    createdVouchers,
    myVouchers,
    loading,
    error,
    fetchVouchers,
  };
};
