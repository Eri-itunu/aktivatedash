import type { IProduct, PaginationMeta } from 'types';
import { getMyProducts, updateProductStatus } from '@/api/brand/product.brand';
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();
const config = useRuntimeConfig();
const apiUrl = config.public.API_URL as string;
const userStore = useUserStore();
const accessToken = userStore.accessToken as string;

export const useBrandProducts = () => {
  const products = ref<IProduct[]>([]);
  const meta = ref<PaginationMeta>();
  const loading = ref(false);
  const updatingId = ref<string | null>(null);
  const error = ref<string | null>(null);
  const page = ref(1);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await getMyProducts({ accessToken, apiUrl, page: page.value });
      products.value = res.data;
      meta.value = res.meta;
    } catch (err: any) {
      error.value = err.message;
      toast({ title: err.message, variant: 'destructive' });
    } finally {
      loading.value = false;
    }
  };

  const toPage = async (index: number) => {
    page.value = index;
    await fetchProducts();
  };

  const nextPage = async () => {
    if (meta.value && page.value < meta.value.lastPage) {
      page.value++;
      await fetchProducts();
    }
  };

  const previousPage = async () => {
    if (page.value > 1) {
      page.value--;
      await fetchProducts();
    }
  };

  const toggleStatus = async (productId: string, currentStatus: string) => {
    const newStatus: 'live' | 'paused' = currentStatus === 'live' ? 'paused' : 'live';
    updatingId.value = productId;
    try {
      await updateProductStatus({ accessToken, apiUrl, productId, status: newStatus });
      const target = products.value.find(p => p.id === productId);
      if (target) target.status = newStatus;
      toast({ title: `Product ${newStatus === 'live' ? 'is now live' : 'paused'}.` });
    } catch (err: any) {
      toast({ title: err.message, variant: 'destructive' });
    } finally {
      updatingId.value = null;
    }
  };

  return { products, meta, loading, updatingId, error, page, fetchProducts, toPage, nextPage, previousPage, toggleStatus };
};
