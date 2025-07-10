import type { Voucher } from 'types';
import { getVoucherChildren, getVoucherDetails } from '@/api/brand/voucher';
import { useToast } from "../components/ui/toast/use-toast";
const { toast } = useToast();
export const useVouchersDetails = () => {
  const createdVouchers = ref<Voucher[]>([]);
  const myVoucher = ref<Voucher | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const checkIfPaid = ref(false)

  const fetchVouchers = async (accessToken: string, apiUrl: string, voucherId:string) => {
    loading.value = true;
    error.value = null;

    try {
      const [createdVouchersRes, myVouchersRes] = await Promise.all([
        getVoucherChildren({ accessToken, apiUrl, voucherId }),
        getVoucherDetails({ accessToken, apiUrl, voucherId }),
      ]);

      createdVouchers.value = createdVouchersRes.data.vouchers;
      myVoucher.value = myVouchersRes.data.voucher;
      checkIfPaid.value = myVouchersRes.data.voucher.paymentVerified;
    } catch (err: any) {
      toast({ title: err.message, variant: 'destructive', });
      error.value = err.message || 'Failed to fetch vouchers';
    } finally {
      loading.value = false;
    }
  };

  return {
    createdVouchers,
    myVoucher,
    loading,
    error,
    fetchVouchers,
    checkIfPaid
  };
};
