<script setup lang="ts">
import { ref, reactive, onMounted, computed, watchEffect } from 'vue';
import { ArrowLeft, UploadCloud } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/toast/use-toast';

definePageMeta({
  layout: "light",
});

const { toast } = useToast();
const router = useRouter();

// --- STATE ---
const activeStep = ref(1);
const form = reactive({
  // Step 1
  image: null as File | null,
  imagePreview: null as string | null,
  name: '',
  category: '',
  
  // Step 2
  description: '',
  commissionType: 'percentage', // 'percentage' | 'fixed'
  commissionValue: '',

  // Step 3
  price: '',
  quantity: '',
});

// --- STEPS CONFIG ---
const steps = [
  { id: 1, label: 'Basic Information', selector: '#step-basic' },
  { id: 2, label: 'Product Details', selector: '#step-details' },
  { id: 3, label: 'Sales Information', selector: '#step-sales' },
];

// --- ACTIONS ---
const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.image = file;
    form.imagePreview = URL.createObjectURL(file);
  }
};

const goBack = () => {
    router.back();
};

const handleCancel = () => {
    router.push('/brands/dashboard/products');
};

const validateForm = () => {
   if (!form.name) return "Product Name is required";
   if (!form.category) return "Category is required";
   if (!form.price) return "Price is required";
   if (!form.quantity) return "Quantity is required";
   if (form.commissionType === 'percentage' && (Number(form.commissionValue) > 100 || Number(form.commissionValue) < 0)) {
       return "Percentage must be between 0 and 100";
   }
   return null;
};

const handleSaveDraft = () => {
    toast({ title: "Draft Saved", description: "Your product draft has been saved." });
    router.push('/brands/dashboard/products');
};

const handlePublish = () => {
    const error = validateForm();
    if (error) {
        toast({ title: "Validation Error", description: error, variant: "destructive" });
        return;
    }
    // Mock API call
    console.log("Publishing product:", form);
    toast({ title: "Success", description: "Product published successfully!" });
    router.push('/brands/dashboard/products');
};


// --- SCROLL SPY LOGIC ---
// Simple IntersectionObserver alternative using scroll position
const handleScroll = (e: Event) => {
    const container = e.target as HTMLElement;
    const scrollPos = container.scrollTop + 150; // Offset

    steps.forEach(step => {
        const el = document.querySelector(step.selector) as HTMLElement;
        if (el) {
            const offsetTop = el.offsetTop;
            const height = el.offsetHeight;
            
            // Note: Since the scroll container is the main page content, offsetTop refers to position within that relative container usually.
            // Adjust logic based on actual layout structure. Assuming standard vertical stack.
            // Using a simpler approach: check if element is roughly in view
        }
    });
};

// Because implementing a perfect scroll spy in a complex layout can be tricky without `useIntersectionObserver`,
// we will simplify: Use IntersectionObserver on mounted.

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
        root: document.querySelector('.scroll-container'), // Ensure we target the scrolling div if possible, or null for viewport
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
        
        <!-- SIDEBAR STEPS (Sticky Container) -->
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
                    
                    <!-- Image Upload -->
                    <div class="w-full">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Images</label>
                        <div 
                            class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors relative"
                        >
                            <div v-if="form.imagePreview" class="absolute inset-0 z-10 bg-white dark:bg-vDarkBlue flex items-center justify-center rounded-lg overflow-hidden p-2">
                                <img :src="form.imagePreview" class="max-h-full object-contain" />
                                <button @click.stop="form.image = null; form.imagePreview = null" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 z-20">
                                    <span class="sr-only">Remove</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer z-0" @change="handleImageUpload" />
                            <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-3">
                                <UploadCloud class="w-6 h-6 text-purple1" />
                            </div>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">Click to upload or drag and drop</p>
                            <p class="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
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

                    <div class="space-y-4">
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Commission Structure</label>
                        <RadioGroup v-model="form.commissionType" class="flex gap-6">
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
                                 {{ form.commissionType === 'percentage' ? '%' : '$' }}
                             </div>
                             <Input 
                                v-model="form.commissionValue" 
                                type="number" 
                                :placeholder="form.commissionType === 'percentage' ? 'e.g. 15' : 'e.g. 10.00'" 
                                class="pl-8" 
                            />
                        </div>
                        <p class="text-xs text-gray-500">
                            {{ form.commissionType === 'percentage' ? 'Creators will earn this percentage of the final sale price.' : 'Creators will earn this fixed amount per sale.' }}
                        </p>
                    </div>
                </section>
                
                <!-- STEP 3: SALES INFO -->
                <section id="step-sales" data-step-id="3" class="scroll-mt-6 p-6 bg-white dark:bg-vDarkBlue rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Sales Information</h2>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Retail Price</label>
                            <div class="relative">
                                <span class="absolute left-3 top-2.5 text-gray-500">$</span>
                                <Input v-model="form.price" type="number" placeholder="0.00" class="pl-7" />
                            </div>
                        </div>

                         <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Stock Quantity</label>
                            <Input v-model="form.quantity" type="number" placeholder="0" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

    <!-- STICKY FOOTER -->
    <div class="border-t bg-white dark:bg-vDarkBlue p-4 shrink-0 z-20 flex justify-between items-center px-6">
        <Button variant="outline" @click="handleSaveDraft" class="border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
            Save as Draft
        </Button>
        <div class="flex gap-3">
            <Button variant="ghost" @click="handleCancel">Cancel</Button>
            <Button @click="handlePublish" class="bg-purple1 text-white hover:bg-purple1/90 w-32">Publish</Button>
        </div>
    </div>

  </div>
</template>
