<template>
  <div class="min-h-[95vh] pb-30">
    <div class="text-medium-title text-neutral-darkset font-bold">Referral</div>

    <div class="text-heading-2 font-medium text-neutral-darkset mt-7.5">Refer Friends. Earn coin together.</div>

    <div class="text-body-2 font-medium text-neutral-normal max-w-xl mt-3 mb-2">
      Earn $50 on every friend across MassBit platform. When a friend successfully logs in and runs node in MassBit
      Route Testnet, you receive $50 worth of MassBit Token and have chance to be delegated to run node/gateway as
      MassBit officially launch...
    </div>

    <a class="text-body-1 text-primary underline" href="https://massbit.io" target="_blank" rel="noopener noreferrer">
      Read more
    </a>

    <div class="mt-15">
      <div class="text-body-1 font-medium text-neutral-darkset">Your referral ID</div>

      <!-- Username -->
      <div class="flex items-center mt-3">
        <span class="text-body-2 font-medium text-primary">{{ $auth.user.data.username }}</span>
        <TheCopyButton class="ml-3" buttonClass="bg-primary-background" :textToCopy="$auth.user.data.username" />
      </div>
    </div>

    <div class="mt-15">
      <div class="text-body-1 font-medium text-neutral-darkset">Your referral link</div>

      <!-- Link -->
      <div class="flex items-center mt-3">
        <span class="text-body-2 font-medium text-primary">{{ referralUrl }}</span>
        <TheCopyButton class="ml-3" buttonClass="bg-primary-background" :textToCopy="referralUrl" />
      </div>
    </div>

    <div class="mt-15">
      <div class="text-body-1 font-medium text-neutral-darkset">
        QR code
        <a download="referral-qr-code.png" :href="qrCodeImage">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.99992 14.167C4.99992 13.946 4.91212 13.734 4.75584 13.5777C4.59956 13.4215 4.3876 13.3337 4.16659 13.3337C3.94557 13.3337 3.73361 13.4215 3.57733 13.5777C3.42105 13.734 3.33325 13.946 3.33325 14.167L3.33325 15.8337C3.33325 16.0547 3.42105 16.2666 3.57733 16.4229C3.73361 16.5792 3.94557 16.667 4.16659 16.667L15.8333 16.667C16.0543 16.667 16.2662 16.5792 16.4225 16.4229C16.5788 16.2666 16.6666 16.0547 16.6666 15.8337L16.6666 14.167C16.6666 13.946 16.5788 13.734 16.4225 13.5777C16.2662 13.4215 16.0543 13.3337 15.8333 13.3337C15.6122 13.3337 15.4003 13.4215 15.244 13.5777C15.0877 13.734 14.9999 13.946 14.9999 14.167L14.9999 15.0003L4.99992 15.0003L4.99992 14.167Z"
              fill="#2C3ACF"
            />
            <path
              d="M10.482 12.348L13.8153 9.99805C13.995 9.8706 14.1169 9.67721 14.1543 9.46015C14.1918 9.24309 14.1418 9.02002 14.0153 8.83971C13.9522 8.74959 13.8718 8.67286 13.7788 8.61397C13.6859 8.55507 13.5821 8.51518 13.4737 8.49658C13.3652 8.47799 13.2541 8.48106 13.1468 8.50563C13.0396 8.5302 12.9382 8.57577 12.8487 8.63971L10.832 10.073L10.832 3.33138C10.832 3.11037 10.7442 2.8984 10.5879 2.74212C10.4316 2.58584 10.2197 2.49805 9.99866 2.49805C9.77764 2.49805 9.56568 2.58584 9.4094 2.74212C9.25312 2.8984 9.16532 3.11037 9.16532 3.33138L9.16532 9.99805L7.16532 8.49805C7.07778 8.43239 6.97815 8.38461 6.87214 8.35745C6.76613 8.33029 6.65581 8.32428 6.54747 8.33975C6.43914 8.35523 6.33491 8.3919 6.24075 8.44765C6.14658 8.50341 6.06432 8.57716 5.99866 8.66471C5.89047 8.80896 5.83199 8.9844 5.83199 9.16471C5.83199 9.29408 5.86211 9.42168 5.91997 9.53739C5.97783 9.6531 6.06183 9.75376 6.16532 9.83138L9.49866 12.3314C9.6396 12.4381 9.81084 12.4972 9.9876 12.5002C10.1644 12.5032 10.3375 12.4499 10.482 12.348Z"
              fill="#2C3ACF"
            />
          </svg>
        </a>
      </div>

      <!-- Link -->
      <div class="relative flex items-center mt-3">
        <img class="border border-primary-background rounded-lg" v-if="qrCodeImage" :src="qrCodeImage" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProfileReferral',

  middleware: ['auth'],
  auth: true,

  data() {
    return {
      qrCodeImage: null,
    };
  },

  computed: {
    referralUrl() {
      return `${window.location.origin}/sign-up?referral=${this.$auth.user.data.username}`;
    },
  },

  async created() {
    this.qrCodeImage = await this.genImageReferralQRCode();
  },

  methods: {
    async genImageReferralQRCode() {
      return await this.$qrcode.toDataURL(this.referralUrl, {
        errorCorrectionLevel: 'H',
      });
    },
  },
};
</script>
