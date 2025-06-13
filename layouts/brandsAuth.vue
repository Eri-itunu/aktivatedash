<template>
    <div class="app w-full h-screen overflow-scroll bg-[#F6F9FA]  flex p-6 flex-col text-black ">
      <nav class="flex items-center md:items-start" >
       <img  src="/images/Logo.svg" class="h-[26px]" alt="">
      </nav>
      <slot/>
    </div>
</template>

<style >
.app {
  font-family: 'Work Sans', sans-serif;
}
</style>