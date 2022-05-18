<template>
  <div class="w-full flex gap-15 py-15 min-h-[91vh]">
    <div class="w-[234px] flex flex-col gap-3">
      <!-- Personal Info -->
      <NuxtLink
        :to="{ name: 'my-profile' }"
        class="h-[44px] px-6 flex items-center text-body-2 text-neutral-darkset font-medium"
        exact-active-class="!text-primary !font-bold bg-neutral-lightest rounded-lg"
      >
        <svg class="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.6267 5.75038C13.6267 7.82166 12.003 9.50076 10 9.50076C7.99704 9.50076 6.37333 7.82166 6.37333 5.75038C6.37333 3.6791 7.99704 2 10 2C12.003 2 13.6267 3.6791 13.6267 5.75038Z"
            fill="currentColor"
          />
          <path
            d="M3.57552 13.9724C4.76613 13.0041 7.13563 11.4368 10 11.4368C12.8644 11.4368 15.2339 13.0041 16.4245 13.9724C16.9559 14.4046 17.1217 15.1353 16.9118 15.8L16.6255 16.7069C16.3819 17.4782 15.6863 18 14.9017 18H5.09829C4.31368 18 3.61807 17.4782 3.37452 16.7069L3.08815 15.8C2.87829 15.1353 3.04407 14.4046 3.57552 13.9724Z"
            fill="currentColor"
          />
        </svg>

        Personal Info
      </NuxtLink>

      <!-- Login & Security -->
      <!-- <NuxtLink
        :to="{ name: 'my-profile-login-security' }"
        class="h-[44px] px-6 flex items-center text-body-2 text-neutral-darkset font-medium"
        exact-active-class="!text-primary !font-bold bg-neutral-lightest rounded-lg"
      >
        <svg class="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.30281 2.18636C7.40599 3.29255 5.00602 4.04972 3.19475 4.30301C2.53729 4.39495 1.9985 4.93532 2.00001 5.59939L2.00092 5.99682C1.97658 10.8309 2.38282 15.0622 9.5712 17.9194C9.84146 18.0268 10.1504 18.0269 10.4207 17.9195C17.6151 15.0623 18.0234 10.831 17.9991 5.99682L17.9989 5.59595C17.9985 4.93322 17.4602 4.38819 16.8057 4.28548C15.0872 4.01579 12.5802 3.26653 10.6854 2.18294C10.258 1.93855 9.72807 1.93835 9.30281 2.18636ZM12.9645 8.96841C13.277 8.65587 13.277 8.14914 12.9645 7.8366C12.6521 7.52406 12.1455 7.52406 11.8331 7.8366L9.19864 10.4719L8.16427 9.43723C7.85183 9.12469 7.34527 9.12469 7.03284 9.43723C6.7204 9.74977 6.7204 10.2565 7.03284 10.569L8.63293 12.1697C8.94536 12.4822 9.45192 12.4822 9.76436 12.1697L12.9645 8.96841Z"
            fill="currentColor"
          />
        </svg>

        Login & Security
      </NuxtLink> -->

      <!-- Referral -->
      <span
        :to="{ name: 'my-profile-referral' }"
        class="opacity-50 cursor-not-allowed h-[44px] px-6 flex items-center text-body-2 text-neutral-darkset font-medium"
        exact-active-class="!text-primary !font-bold bg-neutral-lightest rounded-lg"
      >
        <svg class="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 5C5 5.35064 5.06015 5.68722 5.17071 6H4.5C3.67157 6 3 6.67157 3 7.5V9L17 9V7.5C17 6.72535 16.4128 6.08785 15.6592 6.00835C15.8777 5.5516 16 5.04009 16 4.5C16 2.567 14.433 1 12.5 1C11.3169 1 10.2708 1.58706 9.63731 2.48578C9.16651 2.17856 8.60411 2 8 2C6.34315 2 5 3.34315 5 5ZM12.5 6C13.3284 6 14 5.32843 14 4.5C14 3.67157 13.3284 3 12.5 3C11.6716 3 11 3.67157 11 4.5V6H12.5ZM9 5V6H8C7.44771 6 7 5.55228 7 5C7 4.44772 7.44771 4 8 4C8.55228 4 9 4.44772 9 5Z"
            fill="currentColor"
          />
          <path d="M4 11H9V17H5.5C4.67157 17 4 16.3284 4 15.5V11Z" fill="currentColor" />
          <path d="M16 11H11V17H14.5C15.3284 17 16 16.3284 16 15.5V11Z" fill="currentColor" />
        </svg>

        Referral
      </span>
    </div>

    <div class="w-full">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProfile',

  middleware: ['auth'],
  auth: true,
};
</script>
