<template>
  <div class="w-full max-w-2xl min-h-[95vh] pb-30">
    <div class="w-full flex flex-row">
      <div class="basis-1/2 text-medium-title text-neutral-darkset font-bold">Reward</div>
      <div class="basis-1/4 flex items-center justify-center">
        <BaseSearch v-model="selectedMonth" :source="months" placeholder="Select month" />
      </div>
    </div>
   
    <div v-if="providerRewards && providerRewards.length > 0" class="flex flex-col gap-y-2.5">
      <table>
        <thead>
          <tr>
            <th>Reward date</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reward in providerRewards">
            <td>  
              {{reward.end_time}}
            </td>
            <td>  
              {{reward.reward_tokens}}
            </td>
          </tr>
        </tbody>
      </table>
      
     
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'MyProfileReward',
  async fetch() {
    await this.$store.dispatch('user/getProviderRewards');
  },
  computed: {
    ...mapGetters({
      providerRewards: 'user/providerRewards',
    }),
  },
};
</script>

<style lang="css" scoped>
  th, td {
    text-align: center;
  }
</style>
