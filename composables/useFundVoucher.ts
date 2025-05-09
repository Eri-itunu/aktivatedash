// composables/useAssignVoucher.ts
import { ref } from 'vue';
import { createVoucher } from '@/api/brand/voucher';
import type { GetMyVouchersParams } from '@/types'; // adjust to your actual path

import { useToast } from "../components/ui/toast/use-toast";
const { toast } = useToast();
export const useAssignVoucher = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  const isPaid = ref(false);
  const voucherId = ref();
  const submit = async (params: GetMyVouchersParams) => {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      const res = await createVoucher(params);
      success.value = true;
      isPaid.value = res.data.voucher.paymentVerified;
      voucherId.value = res.data.voucher.id;
      toast({ title: 'Successful voucher request please fund to confirm ', variant: 'success', });
    } catch (err: any) {
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
