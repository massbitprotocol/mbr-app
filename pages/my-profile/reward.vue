<template>
  <div class="w-full max-w-2xl min-h-[95vh] pb-30">
    <div class="w-full flex flex-row">
      <div class="basis-1/2 text-medium-title text-neutral-darkset font-bold">Reward</div>
      <div class="basis-1/4 flex items-center justify-center">
        <month-picker-input
          class="ml-2"
          :no-default="true"
          @change="fetch"
          :default-month="getCurrentMonth"
          :default-year="getCurrentYear"
        ></month-picker-input>
      </div>
    </div>

    <div v-if="providerRewards && providerRewards.length > 0" class="table-wrapper">
      <table>
        <thead class="header">
          <tr>
            <th>Node name</th>
            <th>Type</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Reward day(s)</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody class="body">
          <tr v-for="reward in providerRewards">
            <td>
              {{ reward.node_name }}
            </td>
            <td>
              {{ reward.node_type }}
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
      currentMonth: integer,
      currentYear: integer,
      date: {
        from: null,
        to: null,
        month: null,
        year: null,
      },
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
    getCurrentMonth() {
      let currentMonth = new Date().getMonth();
      if (currentMonth == 1) {
        currentMonth = 12;
      }
      return currentMonth;
    },
    getCurrentYear() {
      const temp = new Date().getMonth();
      let currentYear = new Date().getFullYear();
      if (temp == 1) {
        currentYear -= 1;
      }
      return currentYear;
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
  width: 75vw;
  max-width: 75rem;
}
table {
  border-radius: 6px;
  width: 75vw;
  max-width: 75rem;
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
  padding: 0.5rem 0.75rem;
  overflow: auto;
  border-bottom: 1px solid rgb(219, 219, 219);
  border-right: 1px solid rgb(219, 219, 219);
  min-width: 7rem;
}
th:first-of-type,
td:first-of-type {
  width: 20rem;
}
td:first-of-type {
  text-align: left;
}
td:nth-of-type(6),
td:nth-of-type(7) {
  text-align: right;
}
th:last-of-type,
td:nth-of-type(7) {
  border-right: none;
}
tr:last-of-type > td {
  border-bottom: none;
}
</style>
