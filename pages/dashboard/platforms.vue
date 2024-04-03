<script>
// For Nuxt Bridge

// For Nuxt 3
definePageMeta({
  layout: 'dashboard',
})
</script>


<template>
    <div class="flex justify-between">
        <p>5/5 Accounts Linked</p>

        <UButton size="xl" color = "purple" :ui="{ rounded: 'rounded-full',  }">
            Unlink Accounts
        </UButton>

    </div>


    <div class="flex flex-row rounded-lg bg-vDarkBlue">
        <div class="flex items-center justify-center p-8 w:1/7">
            <img src="../../assets/icons/Insta.svg" alt="">
        </div>

        <div class="flex flex-col justify-between w:2/7">
            <div class="flex flex-col  justify-between ">
                <div>
                    <p>Follwers</p>
                </div>

                <div>
                    <h1>21,000</h1>
                </div>
            </div>
            <div>
                11.35
            </div>
        </div>

        

    </div>
</template>