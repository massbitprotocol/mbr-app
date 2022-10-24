<template>
  <div class="w-full max-w-2xl min-h-[95vh] pb-30">
    <div class="w-full flex flex-row">
      <div class="basis-1/2 text-medium-title text-neutral-darkset font-bold">Reward</div>
      <div class="basis-1/4 flex items-center justify-center">
        <month-picker-input
          class="ml-2"
          :no-default="true"
          @change="fetch"
          :default-month="currentMonth"
          :default-year="currentYear"
        ></month-picker-input>
      </div>
    </div>

    <div v-if="providerRewards && providerRewards.length > 0" class="table-wrapper">
      <table>
        <thead class="header">
          <tr>
            <th>Node name</th>
            <th>Current status</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Reward date</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody class="body">
          <tr v-for="reward in providerRewards">
            <td>
              {{ reward.name }}
            </td>
            <td>
              {{ reward.current_status }}
            </td>
            <td>
              {{ reward.start_time }}
            </td>
            <td>
              {{ reward.end_time }}
            </td>
            <td>
              {{ reward.reward_days }}
            </td>
            <td>
              {{ reward.reward_tokens }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { MonthPickerInput } from 'vue-month-picker';
import { integer } from 'vee-validate/dist/rules';

export default {
  name: 'MyProfileReward',
  data() {
    return {
      date: {
        from: null,
        to: null,
        month: null,
        year: null,
      },
      // providerRewards: [
      //   {
      //     type: 'node',
      //     reward_tokens: 100,
      //     end_time: '21/10/2022',
      //     start_time: '21/9/2022',
      //     name: 'node_test_1',
      //     current_status: 'approved',
      //     reward_days: 31,
      //   },
      //   {
      //     type: 'gateway',
      //     reward_tokens: 200,
      //     end_time: '21/10/2022',
      //     start_time: '21/9/2022',
      //     name: 'gateway_test_1',
      //     current_status: 'approved',
      //     reward_days: 31,
      //   },
      //   {
      //     type: 'gateway',
      //     reward_tokens: 40,
      //     end_time: '21/10/2022',
      //     start_time: '21/9/2022',
      //     name: 'gateway_test_2',
      //     current_status: 'approved',
      //     reward_days: 31,
      //   },
      // ],
    };
  },
  components: { MonthPickerInput },
  methods: {
    toggleMonths() {
      showMonth.value = !showMonth;
    },
    async fetch(date) {
      this.date = date;
      await this.$store.dispatch('user/getProviderRewards', date);
    },
  },

  computed: {
    ...mapGetters({
      providerRewards: 'user/providerRewards',
    }),
    currentMonth() {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return currentMonth > 0 ? currentMonth : 12;
    },
    currentYear() {
      const currentDate = new Date();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return currentMonth > 0 ? currentYear : currentYear - 1;
    },
  },
};
</script>

<style lang="css" scoped>
.table-wrapper {
  margin-top: 1.5rem;
  background: rgb(252, 252, 252);
  border: 1px solid rgb(163, 163, 163);
  border-radius: 6px;
  width: auto;
  display: flex;
  justify-content: center;
  width: 50rem;
}
table {
  border-radius: 6px;
  width: 50rem;
}

.header {
  padding: 1rem;
  color: rgb(0, 17, 168);
  font-size: 1.3rem;
  font-weight: bold;
}
th,
td {
  text-align: center;
  border-collapse: collapse;
  padding: 0.5rem;
  overflow: auto;
  border-bottom: 1px solid rgb(219, 219, 219);
  border-right: 1px solid rgb(219, 219, 219);
  min-width: 6rem;
}
th:last-of-type,
td:nth-of-type(6) {
  border-right: none;
}
tr:last-of-type > td {
  border-bottom: none;
}
</style>
