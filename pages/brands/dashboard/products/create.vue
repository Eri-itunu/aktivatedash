<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { ArrowLeft, UploadCloud, X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/toast/use-toast';
import { createProduct } from '@/api/brand/product.brand';
import { useUserStore } from '@/stores/userStore';

definePageMeta({
  layout: "light",
});

const { toast } = useToast();
const router = useRouter();
const config = useRuntimeConfig();
const userStore = useUserStore();

// --- STATE ---
const activeStep = ref(1);
const form = reactive({
  // Step 1
  primaryImage: null as File | null,
  primaryImagePreview: null as string | null,
  additionalImages: [] as File[],
  additionalImagePreviews: [] as string[],
  name: '',
  category: '',

  // Step 2
  description: '',
  commissionStructure: 'percentage' as 'percentage' | 'fixed',
  commissionValue: '',
  visibility: 'public' as 'public' | 'private',

  // Step 3
  retailPrice: '',
  currency: 'NGN',
  quantity: '',
  sellerSku: '',
});

// --- STEPS CONFIG ---
const steps = [
  { id: 1, label: 'Basic Information', selector: '#step-basic' },
  { id: 2, label: 'Product Details', selector: '#step-details' },
  { id: 3, label: 'Sales Information', selector: '#step-sales' },
];

// --- ACTIONS ---
const handlePrimaryImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.primaryImage = file;
    form.primaryImagePreview = URL.createObjectURL(file);
  }
};

const handleAdditionalImagesUpload = (event: Event) => {
  const files = Array.from((event.target as HTMLInputElement).files || []);
  const remaining = 5 - form.additionalImages.length;
  const toAdd = files.slice(0, remaining);
  toAdd.forEach(file => {
    form.additionalImages.push(file);
    form.additionalImagePreviews.push(URL.createObjectURL(file));
  });
  (event.target as HTMLInputElement).value = '';
};

const removeAdditionalImage = (index: number) => {
  URL.revokeObjectURL(form.additionalImagePreviews[index]);
  form.additionalImages.splice(index, 1);
  form.additionalImagePreviews.splice(index, 1);
};

const goBack = () => router.back();
const handleCancel = () => router.push('/brands/dashboard/products');

const validateForm = () => {
  if (!form.name) return "Product Name is required";
  if (!form.category) return "Category is required";
//   if (!form.primaryImage) return "A primary product image is required";
  if (!form.retailPrice) return "Retail Price is required";
  if (!form.quantity) return "Quantity is required";
  if (form.commissionStructure === 'percentage' && form.commissionValue) {
    const v = Number(form.commissionValue);
    if (v < 0 || v > 100) return "Percentage must be between 0 and 100";
  }
  return null;
};

const { mutate: submitProduct, isPending } = useMutation({
  mutationFn: () => createProduct({
    payload: {
      name: form.name,
      category: form.category,
      description: form.description,
      commissionStructure: form.commissionStructure,
      commissionFixedAmount: form.commissionStructure === 'fixed' ? Number(form.commissionValue) : undefined,
      commissionPercentage: form.commissionStructure === 'percentage' ? Number(form.commissionValue) : undefined,
      visibility: form.visibility,
      retailPrice: Number(form.retailPrice),
      currency: form.currency,
      quantity: Number(form.quantity),
      sellerSku: form.sellerSku || undefined,
      primaryImage: form.primaryImage!,
      images: form.additionalImages.length ? form.additionalImages : undefined,
    },
    accessToken: userStore.accessToken as string,
    apiUrl: config.public.API_URL as string,
  }),
  onSuccess: () => {
    toast({ title: "Success", description: "Product published successfully!" });
    router.push('/brands/dashboard/products');
  },
  onError: (error: any) => {
    const message = error?.response?.data?.message || error?.message || 'Failed to publish product';
    toast({ title: "Error", description: message, variant: "destructive" });
  },
});

const handlePublish = () => {
  const error = validateForm();
  if (error) {
    toast({ title: "Validation Error", description: error, variant: "destructive" });
    return;
  }
  submitProduct();
};

const handleSaveDraft = () => {
  toast({ title: "Draft Saved", description: "Your product draft has been saved." });
  router.push('/brands/dashboard/products');
};

// --- SCROLL SPY ---
const scrollToStep = (id: number, selector: string) => {
  const el = document.querySelector(selector);
  el?.scrollIntoView({ behavior: 'smooth' });
  activeStep.value = id;
};

let observer: IntersectionObserver;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = Number(entry.target.getAttribute('data-step-id'));
        if (id) activeStep.value = id;
      }
    });
  }, {
    root: document.querySelector('.scroll-container'),
    threshold: 0.5
  });

  steps.forEach(step => {
    const el = document.querySelector(step.selector);
    if (el) observer.observe(el);
  });
});
</script>

<template>
  <div class="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-gray-50 dark:bg-[#090618]/30">

    <!-- FLUSH HEADER -->
    <div class="flex items-center gap-4 px-6 py-4 shrink-0 z-10">
      <Button variant="ghost" size="icon" @click="goBack" class="-ml-2">
        <ArrowLeft class="w-5 h-5" />
      </Button>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
    </div>

    <!-- CONTENT LAYOUT -->
    <div class="flex flex-1 overflow-hidden relative">

      <!-- SIDEBAR STEPS -->
      <div class="hidden lg:block w-72 pl-6 pr-4 pb-6 overflow-y-auto">
        <div class="bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
          <div class="space-y-6">
            <div v-for="step in steps" :key="step.id" class="relative pl-4 border-l-2 transition-colors duration-300"
              :class="activeStep >= step.id ? 'border-purple1' : 'border-gray-100 dark:border-gray-700'">
              <a
                :href="step.selector"
                @click.prevent="scrollToStep(step.id, step.selector)"
                class="block text-sm font-medium transition-colors duration-200"
                :class="activeStep === step.id ? 'text-purple1 font-bold' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'"
              >
                {{ step.label }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- MAIN FORM SCROLL AREA -->
      <div class="flex-1 overflow-y-auto px-4 pb-24 scroll-container scroll-smooth">
        <div class="max-w-3xl space-y-6">

          <!-- STEP 1: BASIC INFO -->
          <section id="step-basic" data-step-id="1" class="scroll-mt-6 p-6 bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>

            <!-- Primary Image Upload -->
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Product Image <span class="text-red-500">*</span></label>
              <div class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors relative">
                <div v-if="form.primaryImagePreview" class="absolute inset-0 z-10 bg-white dark:bg-vDarkBlue flex items-center justify-center rounded-lg overflow-hidden p-2">
                  <img :src="form.primaryImagePreview" class="max-h-full object-contain" />
                  <button @click.stop="form.primaryImage = null; form.primaryImagePreview = null" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 z-20">
                    <span class="sr-only">Remove</span>
                    <X class="w-4 h-4" />
                  </button>
                </div>
                <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer z-0" @change="handlePrimaryImageUpload" />
                <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-3">
                  <UploadCloud class="w-6 h-6 text-purple1" />
                </div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">Click to upload or drag and drop</p>
                <p class="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>

            <!-- Additional Images -->
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Images <span class="text-gray-400 font-normal">(up to 5)</span></label>
              <div class="flex flex-wrap gap-3">
                <div v-for="(preview, i) in form.additionalImagePreviews" :key="i" class="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img :src="preview" class="w-full h-full object-cover" />
                  <button @click="removeAdditionalImage(i)" class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                    <X class="w-3 h-3" />
                  </button>
                </div>
                <label v-if="form.additionalImages.length < 5" class="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <UploadCloud class="w-5 h-5 text-gray-400 mb-1" />
                  <span class="text-xs text-gray-400">Add</span>
                  <input type="file" accept="image/*" multiple class="hidden" @change="handleAdditionalImagesUpload" />
                </label>
              </div>
            </div>

            <!-- Name -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
              <Input v-model="form.name" placeholder="e.g. Wireless Headphones" />
            </div>

            <!-- Category -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Product Category</label>
              <Select v-model="form.category">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="home">Home & Living</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="shoe">Shoe</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </section>

          <!-- STEP 2: DETAILS -->
          <section id="step-details" data-step-id="2" class="scroll-mt-6 p-6 bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Product Details</h2>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <Textarea v-model="form.description" placeholder="Describe your product..." class="min-h-[150px]" />
            </div>

            <!-- Commission Structure -->
            <div class="space-y-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Commission Structure</label>
              <RadioGroup v-model="form.commissionStructure" class="flex gap-6">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="comm-percentage" value="percentage" />
                  <label for="comm-percentage" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Percentage of Sale</label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="comm-fixed" value="fixed" />
                  <label for="comm-fixed" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Fixed Amount</label>
                </div>
              </RadioGroup>

              <div class="relative w-full sm:w-1/2">
                <div class="absolute left-3 top-2.5 text-gray-500 text-sm">
                  {{ form.commissionStructure === 'percentage' ? '%' : '₦' }}
                </div>
                <Input
                  v-model="form.commissionValue"
                  type="number"
                  :placeholder="form.commissionStructure === 'percentage' ? 'e.g. 15' : 'e.g. 20000'"
                  class="pl-8"
                />
              </div>
              <p class="text-xs text-gray-500">
                {{ form.commissionStructure === 'percentage' ? 'Creators will earn this percentage of the final sale price.' : 'Creators will earn this fixed amount per sale.' }}
              </p>
            </div>

            <!-- Visibility -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Visibility</label>
              <Select v-model="form.visibility">
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p class="text-xs text-gray-500">Public products are discoverable by creators.</p>
            </div>
          </section>

          <!-- STEP 3: SALES INFO -->
          <section id="step-sales" data-step-id="3" class="scroll-mt-6 p-6 bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Sales Information</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Retail Price -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Retail Price</label>
                <div class="flex gap-2">
                  <!-- <Select v-model="form.currency" class="w-12 shrink-0">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="NGN">NGN</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select> -->
                  <Input v-model="form.retailPrice" type="number" placeholder="0.00" class="flex-1" />
                </div>
              </div>

              <!-- Stock Quantity -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Stock Quantity</label>
                <Input v-model="form.quantity" type="number" placeholder="0" />
              </div>

              <!-- Seller SKU -->
              <div class="space-y-2 sm:col-span-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Seller SKU <span class="text-gray-400 font-normal">(optional)</span></label>
                <Input v-model="form.sellerSku" placeholder="e.g. ABC-123" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- STICKY FOOTER -->
    <div class="border-t bg-white dark:bg-vDarkBlue p-4 shrink-0 z-20 flex justify-between items-center px-6">
      <Button variant="outline" @click="handleSaveDraft" :disabled="isPending" class="border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
        Save as Draft
      </Button>
      <div class="flex gap-3">
        <Button variant="ghost" @click="handleCancel" :disabled="isPending">Cancel</Button>
        <Button @click="handlePublish" :disabled="isPending" class="bg-purple1 text-white hover:bg-purple1/90 w-32">
          {{ isPending ? 'Publishing...' : 'Publish' }}
        </Button>
      </div>
    </div>

  </div>
</template>
