<script setup lang="ts">
    definePageMeta({
        layout: "light",
    });
    import { ArrowLeft, Gift, CircleDollarSign, Plus, Truck } from 'lucide-vue-next';
    import { format } from "date-fns";
    const createBrandCampaignStore = useCreateBrandCampaignStore();
    const createCollaboration = useCollabHubStore();
    const selectedOption = ref('pay')
    const showError=ref(false)
    const amount = ref()
    import { useToast } from '@/components/ui/toast/use-toast';
    const { toast } = useToast();


   
    const validateAndProceed = () => {
      // Validate payment details based on the selected option
      const { paymentOption, amount, giftItem } = createCollaboration;
      const isValidNumber = (value: any): boolean => {
        const numberValue = Number(value); // Explicitly convert to a number
        return typeof numberValue === "number" && !Number.isNaN(numberValue) && numberValue > 0;
      };
      if (
        (paymentOption === 'pay' && (!isValidNumber(amount))) ||
        (paymentOption === 'gift' && !giftItem) ||
        (paymentOption === 'payAndGift' && (!isValidNumber(amount) || !giftItem))
      ) {
        showError.value = true;
        toast({ title: "Please enter valid payment Amount." }); // Error message
        return;
      }

      // Update payment properties based on the selected option
      switch (paymentOption) {
        case 'gift':
          createCollaboration.amount = 0;
          createCollaboration.isGift = true;
          createCollaboration.isMonetary = false;
          break;

        case 'pay':
          createCollaboration.giftItem = '';
          createCollaboration.isGift = false;
          createCollaboration.isMonetary = true;
          break;

        case 'payAndGift':
          createCollaboration.isGift = true;
          createCollaboration.isMonetary = true;
          break;

        default:
          showError.value = true; // Fail-safe for invalid payment options
          return;
      }

      // Clear errors and proceed
      showError.value = false;

      // Navigate to the next step
      navigateTo('preview');
    };
</script>

<template>
    <div class=" text-black dark:text-white p-8 flex flex-col gap-8 min-h-screen bg-[#F5F5F5] dark:bg-dashbg " >
        <nuxt-link to="/brands/dashboard/collaborationHub/campaign" >
            <ArrowLeft />
        </nuxt-link>

        <BrandsCHubStage :campaign="true" :requirements="true" :deliverables="true" :compensation="false" />

        <div class="rounded-[8px] bg-white dark:bg-[#090618] " >
            <header class="p-4">
                <h1 class="text-2xl" >Compensation</h1>
                <p class="text-[#000000] dark:text-white" >What are you offering creators </p>
            </header>

            <form class="p-4 w-full flex flex-col gap-8">
              <!-- Option 1: I will pay the creator -->
              <div class="flex gap-4 items-start border-b py-4">
                <div class="rounded-full bg-[#E9E6F3] max-w-fit p-2">
                  <CircleDollarSign class="w-5 h-5" color="#000000" />
                </div>
                <input
                  type="radio"
                  id="payCreator"
                  class="h-5 w-5 mt-2"
                  value="pay"
                  v-model="createCollaboration.paymentOption"
                />
                <div class="flex flex-col justify-end">
                  <h2 class="font-bold">I will pay the creator</h2>
                  <p class="opacity-[56%]">you collaborate with a creator on a paid campaign</p>

                  <div class="mt-1" v-if="createCollaboration.paymentOption === 'pay'">
                    <p>Amount</p>
                    <div class="flex gap-1 items-center">
                        <input
                        class="bg-transparent border rounded-lg p-2"
                        type="text"
                        v-model="createCollaboration.amount"
                        placeholder="e.g. N800 per creator"
                      /> 
                      <p> /per creator</p>
                    </div>
                    <p v-if="showError && !createCollaboration.amount" class="text-red-500 text-sm">
                      Please specify an amount.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Option 2: I will gift the creator a product or service -->
              <div class="flex gap-4 items-start border-b py-4">
                <div class="rounded-full bg-[#E9E6F3] max-w-fit p-2">
                  <Gift class="w-5 h-5" color="#000000" />
                </div>
                <input
                  type="radio"
                  id="giftCreator"
                  class="h-5 w-5 mt-2"
                  value="gift"
                  v-model="createCollaboration.paymentOption"
                />
                <div class="flex flex-col justify-end">
                  <h2 class="font-bold">I will gift the creator a product or service</h2>
                  <p class="opacity-[56%]">you collaborate with creators in exchange for your product or service</p>

                  <div v-if="createCollaboration.paymentOption === 'gift'">
                    <h3 class="mt-3">What is the gift?</h3>
                    <div class="flex items-center gap-1">
                      <input
                        class="bg-transparent border rounded-lg p-2"
                        type="text"
                        v-model="createCollaboration.giftItem"
                        placeholder="e.g. a gift card worth NGN2,000"
                      />
                      <p>/per creator</p>
                    </div>
                    <p v-if="showError && !createCollaboration.giftItem" class="text-red-500 text-sm">
                      Please specify the gift item.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Option 3: I'm offering a paid campaign and a gift -->
              <div class="flex gap-2 items-start py-4">
                <div class="flex items-center gap-1">
                  <div class="rounded-full bg-[#E9E6F3] max-w-fit p-2">
                    <Gift class="w-5 h-5" color="#000000" />
                  </div>
                  <Plus />
                  <div class="rounded-full bg-[#E9E6F3] max-w-fit p-2">
                    <CircleDollarSign class="w-5 h-5" color="#000000" />
                  </div>
                </div>
                <input
                  type="radio"
                  id="payAndGiftCreator"
                  class="h-5 w-5 mt-2"
                  value="payAndGift"
                  v-model="createCollaboration.paymentOption"
                />
                <div class="flex flex-col justify-end">
                  <h2 class="font-bold">I'm offering a paid campaign and a gift</h2>
                  <p class="opacity-[56%]" >you pay the creator a fee and also gift your products or services</p>

                  <div v-if="createCollaboration.paymentOption === 'payAndGift'" class="flex gap-2 items-center mt-4 w-full">
                    <input
                      class="bg-transparent border rounded-lg p-2"
                      type="text"
                      v-model="createCollaboration.giftItem"
                      placeholder="e.g. a gift card worth NGN2,000"
                    />
                    <input
                      class="bg-transparent border rounded-lg p-2"
                      type="text"
                      v-model="createCollaboration.amount"
                      placeholder="e.g. $800 per creator"
                    />
                    <p>/per creator</p>
                  </div>
                  <p v-if="showError && (!createCollaboration.amount || !createCollaboration.giftItem)" class="text-red-500 text-sm">
                    Please specify both the amount and the gift item.
                  </p>
                </div>
              </div>
              <div class="rounded-[20px] bg-purplebg text-black dark:text-black flex gap-1 w-full p-6" >
                <Truck />
                <div>
                  <h2 class="font-bold" >
                    Please note that all physical products will be brought directly to us first for confirmation
                  </h2>
                  <p>
                    Shipping expenses to creators are not covered by Aktivate
                  </p>
                </div>
              </div>

            
            </form>

            <footer class="w-full flex justify-between border-t-[0.5px] border-t-[#464160] p-4" >
                <nuxt-link to="deliverables" class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
                    Back
                </nuxt-link>

                <button @click="validateAndProceed" class="rounded-[28px]  px-6 py-2 bg-purple1 text-white" >
                    Preview campaign
                </button>
            </footer>


            
        </div>
  
    </div>
</template>

