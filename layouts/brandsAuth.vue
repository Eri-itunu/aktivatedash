<template>
  <Head> 
      <Meta name="apple-mobile-web-app-capable", content="yes"/>
    </Head>
   <v-app class="app">
      <div class="app w-full">
        <slot/>
      </div>
   </v-app>
</template>

<style >
.app {
  font-family: 'Work Sans', sans-serif;
}
</style>