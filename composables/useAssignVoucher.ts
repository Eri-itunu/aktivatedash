
import { assignVoucher } from '@/api/brand/voucher';
import type { AssignVoucherParams } from '@/types'; // adjust to your actual path

import { useToast } from "../components/ui/toast/use-toast";
const { toast } = useToast();
export const useAssignVoucher = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  const isPaid = ref(false);
  const voucherId = ref();
  const submit = async (params: AssignVoucherParams) => {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      const res = await assignVoucher(params);
      success.value = true;
      toast({ title: 'Successful voucher request  ', variant: 'success', });
    } catch (err: any) {
        toast({ title: err.message, variant: 'destructive', });
        error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    submit,
    loading,
    error,
    success,
    isPaid,
    voucherId
  };
};
