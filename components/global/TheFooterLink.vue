<template>
  <div class="grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-x-4 gap-y-8">
    <TheCopyright class="lg:order-first pt-10 lg:pt-0" />

    <div class="space-y-4">
      <div class="text-body-1 font-bold uppercase">Products</div>
      <ul class="space-y-3 text-sm">
        <li>
          <a
            href="https://massbit.io/coming-soon.html"
            target="_blank"
            class="text-primary-background/80 hover:underline"
          >
            MassBit Route
          </a>
        </li>
        <li>
          <a
            href="https://massbit.io/coming-soon.html"
            target="_blank"
            class="text-primary-background/80 hover:underline"
          >
            Cross-chain Indexing
          </a>
        </li>
        <li>
          <a
            href="https://massbit.io/coming-soon.html"
            target="_blank"
            class="text-primary-background/80 hover:underline"
          >
            MassBit Insights
          </a>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <div class="text-body-1 font-bold uppercase">ABOUT</div>
      <ul class="space-y-3 text-sm text-primary-background">
        <li>
          <a
            href="https://docs.massbit.io/about/introduction"
            target="_blank"
            class="text-primary-background/80 hover:underline"
            >Whitepaper</a
          >
        </li>
        <li>
          <a
            href="https://massbit.io/coming-soon.html"
            target="_blank"
            class="text-primary-background/80 hover:underline"
            >One page</a
          >
        </li>
        <li>
          <a
            href="https://massbit.io/coming-soon.html"
            target="_blank"
            class="text-primary-background/80 hover:underline"
            >Products</a
          >
        </li>
        <li>
          <a href="https://codelight.breezy.hr/" target="_blank" class="text-primary-background/80 hover:underline"
            >Careers</a
          >
        </li>
        <li>
          <a
            href="https://docs.massbit.io/about/contact-us"
            target="_blank"
            class="text-primary-background/80 hover:underline"
            >Customer Support</a
          >
        </li>
      </ul>
    </div>

    <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="div" class="space-y-7.5">
      <div class="space-y-4">
        <div class="text-body-1 font-bold uppercase">Get The Latest News In Your Inbox</div>
        <form @submit.prevent="handleSubmit(subscribeMassbit)" class="text-sm">
          <ValidationProvider v-slot="{ errors }" rules="required|email" name="email" tag="div">
            <div class="rounded-lg p-1 bg-white inline-flex items-center">
              <input
                class="text-body-2 text-neutral-normal bg-transparent border-0 outline-0 focus:ring-0"
                placeholder="Your email address"
                type="text"
                v-model="email"
              />

              <BaseButton type="submit" :disabled="invalid" :loading="loading"> Subscribe </BaseButton>
            </div>

            <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
          </ValidationProvider>
        </form>
      </div>

      <div class="flex items-center gap-4">
        <a href="https://twitter.com/massbitprotocol" target="_blank">
          <img src="https://massbit.io/images/socials/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://massbit.medium.com/" target="_blank">
          <img src="https://massbit.io/images/socials/medium.svg" alt="Medium" />
        </a>
        <a href="https://t.me/massbit" target="_blank">
          <img src="https://massbit.io/images/socials/telegram.svg" alt="Telegram" />
        </a>
        <a href="https://www.youtube.com/channel/UCMdDh0sCnsW_dyEpG-MlnfA" target="_blank">
          <img src="https://massbit.io/images/socials/youtube.svg" alt="Youtube" />
        </a>
        <a href="https://www.facebook.com/massbit.io" target="_blank">
          <img src="https://massbit.io/images/socials/facebook.svg" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/massbit.io/" target="_blank">
          <img src="https://massbit.io/images/socials/instagram.svg" alt="Instagram" />
        </a>
        <a href="https://github.com/massbitprotocol/" target="_blank">
          <img src="https://massbit.io/images/socials/github.svg" alt="Github" />
        </a>
        <a href="coming-soon.html" target="_blank">
          <img src="https://massbit.io/images/socials/discord.svg" alt="Discord" />
        </a>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'TheFooterLink',

  data() {
    return {
      email: '',
      loading: false,
    };
  },

  methods: {
    subscribeMassbit() {
      //
    },
  },
};
</script>
