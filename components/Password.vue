
<template>
  <div class=" flex justify-between items-center border p-3 border-1 border-black rounded-md">
    <input :type="inputType" class="w-full outline-none pl-2" v-model="password" :placeholder="placeholder">
    <button @click="toggleVisibility">
      {{ showPassword ? '' : '' }} <img src="../assets/icons/eye.svg" alt="">
    </button>
  </div>
</template>
  
  <script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: 'Enter your password' // Default placeholder text
      }
    },
    data() {
      return {
        password: '',
        showPassword: false
      };
    },
    computed: {
      inputType() {
        return this.showPassword ? 'text' : 'password';
      }
    },
    methods: {
      toggleVisibility() {
        this.showPassword = !this.showPassword;
      }
    }
  };
  </script>
  

