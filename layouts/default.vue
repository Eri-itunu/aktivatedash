<template >
    <Head> 
      <Meta name="apple-mobile-web-app-capable", content="yes"/>
    </Head>

      <div class=" bg-[#5331E8] h-screen  px-6 flex md:flex-row flex-col gap-4 overflow-scroll">

        <div class="md:w-1/3 flex flex-col justify-between gap-10 overflow-hidden">
          
          <div class="basis-1/2">
            <img src="/assets/icons/AktivateLogo.svg" class="w-48 h-32" alt="">

            <p class=" text-4xl text-white">
                Welcome to Aktivate!
            </p>
          </div>
              
          <div class="basis-1/2 flex items-end">
            <img src="/assets/images/womanPhone.svg" class="object-cover z-[1] hidden md:block " alt="Background Image">
            
          </div>
          
        </div>

        <div class="md:w-2/3 flex py-16 justify-center container mx-auto">
            <div class="  bg-white rounded-[30px] border-[5px]  h-full  w-full border-black overflow-y-scroll overflow-hidden hide-scrollbar">
                <slot />
            </div>
        </div>

        <img src="/assets/images/waves.png" class="hidden lg:block absolute bottom-0 left-0 h-auto w-[600px] " alt="Background Image">

      </div>

</template>

<style>
  /* Hide scrollbar for all elements */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Optional: If you want to hide scrollbar only for specific elements */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .app {
  font-family: 'Work Sans', sans-serif;
  background-color:'#5331E8';
}
</style>

<script setup lang="ts"> 
const route = useRoute();



</script>

