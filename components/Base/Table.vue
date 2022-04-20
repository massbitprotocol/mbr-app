<template>
  <table class="w-full">
    <colgroup>
      <template v-for="(column, index) in _columns">
        <col v-if="column.width" span="1" :key="index" :width="column.width" />
        <col v-else :key="index" />
      </template>
    </colgroup>

    <thead>
      <tr>
        <th v-for="(column, index) in _columns" :key="index" class="px-6 py-3">
          <div class="flex items-center justify-between">
            <span class="text-left text-xs font-medium text-white uppercase">
              {{ column.title }}
            </span>

            <span v-if="column.sort" class="cursor-pointer" @click="changeSorter(column.dataIndex)">
              <template v-if="sortType && sortDataIndex === column.dataIndex">
                <!-- Caret up -->
                <svg
                  v-if="sortType === 'desc'"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 12L10 7L5 12H15Z" fill="#050C72" />
                </svg>

                <!-- Caret down -->
                <svg
                  v-if="sortType === 'asc'"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8L10 13L15 8H5Z" fill="#050C72" />
                </svg>
              </template>

              <template v-else>
                <!-- Caret up and down -->
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 16L6 12H14L10 16ZM10 4L14 8H6L10 4Z"
                    fill="white"
                  />
                </svg>
              </template>
            </span>
          </div>

          <!-- Filter input -->
          <div v-if="column.filter === 'text'" class="relative flex items-center mt-2 w-full flex-wrap items-stretch">
            <input
              type="text"
              v-model="column.filterInput"
              :placeholder="column.title"
              class="appearance-none block w-full text-body-2 border border-primary-background rounded leading-tight"
            />
            <span
              class="flex justify-center h-full leading-snug font-normal absolute align-center text-center absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.59998 8.39967C3.59998 5.75261 5.75276 3.59992 8.39994 3.59992C11.0471 3.59992 13.1999 5.75261 13.1999 8.39967C13.1999 11.0467 11.0471 13.1994 8.39994 13.1994C5.75276 13.1994 3.59998 11.0467 3.59998 8.39967ZM17.7654 16.6336L13.4495 12.3171C14.3245 11.1987 14.7999 9.81964 14.7999 8.39967C14.7999 4.87105 11.9287 2 8.39994 2C4.87117 2 2 4.87105 2 8.39967C2 11.9283 4.87117 14.7993 8.39994 14.7993C9.81988 14.7989 11.1989 14.3236 12.3175 13.449L16.6343 17.7648C16.7084 17.8393 16.7965 17.8985 16.8936 17.9389C16.9906 17.9792 17.0947 18 17.1998 18C17.305 18 17.4091 17.9792 17.5061 17.9389C17.6032 17.8985 17.6913 17.8393 17.7654 17.7648C17.8398 17.6906 17.8988 17.6024 17.939 17.5054C17.9793 17.4083 18 17.3043 18 17.1992C18 17.0942 17.9793 16.9901 17.939 16.8931C17.8988 16.796 17.8398 16.7079 17.7654 16.6336Z"
                  fill="#717591"
                />
              </svg>
            </span>
          </div>

          <!-- Filter select -->
          <select
            v-else-if="column.filter === 'select'"
            v-model="column.filterInput"
            class="flex items-center mt-2 w-full px-3 cursor-pointer border border-primary-background rounded text-body-2 text-neutral-darker font-medium"
          >
            <template v-for="item in column.filterSelectSource">
              <option :key="item.value" :value="item.value">{{ item.name }}</option>
            </template>
          </select>
        </th>
      </tr>
    </thead>

    <tbody class="bg-white">
      <template v-if="filterSource && filterSource.length > 0">
        <tr v-for="(data, index) in filterSource" :key="index" class="hover:bg-primary-background">
          <td
            v-for="(column, columnIndex) in _columns"
            :key="columnIndex"
            :class="[column.class, 'relative px-6 py-4 max-w-0']"
          >
            <slot
              v-if="column.slotScope"
              :name="column.slotScope"
              :record="data"
              :index="index"
              :item="data[column.dataIndex]"
            ></slot>
            <div v-else class="text-base">
              <template v-if="data.hasOwnProperty(column.dataIndex)">
                {{ data[column.dataIndex] }}
              </template>
            </div>
          </td>
        </tr>
      </template>

      <template v-else>
        <tr>
          <td :colspan="_columns.length">
            <div v-if="loading" class="w-full flex flex-col items-center justify-center py-10">
              <svg
                class="animate-spin -ml-1 mr-3 h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <div v-else class="w-full flex flex-col items-center justify-center py-10">
              <svg
                class="w-15 h-15"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="256"
                height="256"
                viewBox="0 0 256 256"
                xml:space="preserve"
              >
                <g transform="translate(128 128) scale(0.72 0.72)" style="">
                  <g
                    style="
                      stroke: none;
                      stroke-width: 0;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: none;
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                  >
                    <path
                      d="M 45 82.073 c -11.989 0 -21.743 -9.754 -21.743 -21.742 c 0 -11.989 9.754 -21.743 21.743 -21.743 c 11.989 0 21.743 9.754 21.743 21.743 C 66.743 72.319 56.989 82.073 45 82.073 z M 45 42.588 c -9.783 0 -17.743 7.96 -17.743 17.743 S 35.217 78.073 45 78.073 s 17.743 -7.959 17.743 -17.742 S 54.783 42.588 45 42.588 z"
                      style="
                        stroke: none;
                        stroke-width: 1;
                        stroke-dasharray: none;
                        stroke-linecap: butt;
                        stroke-linejoin: miter;
                        stroke-miterlimit: 10;
                        fill: rgb(158, 158, 158);
                        fill-rule: nonzero;
                        opacity: 1;
                      "
                      transform=" matrix(1 0 0 1 0 0) "
                      stroke-linecap="round"
                    />
                    <path
                      d="M 70.63 69.184 h -7.11 v -4 h 7.11 c 8.476 0 15.37 -6.895 15.37 -15.37 c 0 -8.475 -6.895 -15.37 -15.37 -15.37 h -2.113 l -0.204 -1.77 C 66.943 20.846 56.921 11.927 45 11.927 c -11.921 0 -21.944 8.919 -23.313 20.747 l -0.205 1.77 H 19.37 C 10.895 34.444 4 41.339 4 49.813 c 0 8.476 6.895 15.37 15.37 15.37 h 7.111 v 4 H 19.37 C 8.689 69.184 0 60.494 0 49.813 c 0 -10.209 7.939 -18.599 17.968 -19.319 C 20.302 17.513 31.631 7.927 45 7.927 s 24.697 9.586 27.032 22.567 C 82.061 31.215 90 39.604 90 49.813 C 90 60.494 81.311 69.184 70.63 69.184 z"
                      style="
                        stroke: none;
                        stroke-width: 1;
                        stroke-dasharray: none;
                        stroke-linecap: butt;
                        stroke-linejoin: miter;
                        stroke-miterlimit: 10;
                        fill: rgb(158, 158, 158);
                        fill-rule: nonzero;
                        opacity: 1;
                      "
                      transform=" matrix(1 0 0 1 0 0) "
                      stroke-linecap="round"
                    />
                    <path
                      d="M 52.79 70.079 c -0.512 0 -1.023 -0.195 -1.414 -0.586 L 35.879 53.996 c -0.781 -0.781 -0.781 -2.047 0 -2.828 c 0.78 -0.781 2.048 -0.781 2.828 0 l 15.497 15.497 c 0.781 0.781 0.781 2.047 0 2.828 C 53.813 69.884 53.302 70.079 52.79 70.079 z"
                      style="
                        stroke: none;
                        stroke-width: 1;
                        stroke-dasharray: none;
                        stroke-linecap: butt;
                        stroke-linejoin: miter;
                        stroke-miterlimit: 10;
                        fill: rgb(158, 158, 158);
                        fill-rule: nonzero;
                        opacity: 1;
                      "
                      transform=" matrix(1 0 0 1 0 0) "
                      stroke-linecap="round"
                    />
                    <path
                      d="M 37.293 70.079 c -0.512 0 -1.024 -0.195 -1.414 -0.586 c -0.781 -0.781 -0.781 -2.047 0 -2.828 l 15.497 -15.497 c 0.781 -0.781 2.047 -0.781 2.828 0 s 0.781 2.047 0 2.828 L 38.707 69.493 C 38.317 69.884 37.805 70.079 37.293 70.079 z"
                      style="
                        stroke: none;
                        stroke-width: 1;
                        stroke-dasharray: none;
                        stroke-linecap: butt;
                        stroke-linejoin: miter;
                        stroke-miterlimit: 10;
                        fill: rgb(158, 158, 158);
                        fill-rule: nonzero;
                        opacity: 1;
                      "
                      transform=" matrix(1 0 0 1 0 0) "
                      stroke-linecap="round"
                    />
                  </g>
                </g>
              </svg>
              <div class="text-base text-gray-400">No Data</div>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'BaseTable',

  props: {
    columns: {
      type: Array,
      default: () => [],
      required: true,
    },

    dataSource: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      sortType: null,
      sortDataIndex: null,
    };
  },

  computed: {
    _columns: {
      get() {
        return this.columns;
      },
      set(value) {
        this.$emit('update:columns', value);
      },
    },

    filterSource() {
      let _dataSource = [];

      // Get column has filter
      const _columns = this._columns.filter((column) => {
        if (column.filter === 'text') {
          return !!column.filterInput;
        }
        if (column.filter === 'select') {
          return !(column.filterInput === 'all');
        }

        return false;
      });

      if (_columns.length === 0) {
        _dataSource = this.dataSource;
      } else {
        _dataSource = this.dataSource.filter((item) => {
          let filterCheck = true;

          for (let index = 0; index < _columns.length; index++) {
            const column = _columns[index];
            if (item.hasOwnProperty(column.dataIndex)) {
              const _item = item[column.dataIndex];
              switch (column.filter) {
                case 'text':
                  filterCheck = _item.toString().toLowerCase().includes(column.filterInput.toLowerCase()) * filterCheck;
                  break;

                case 'select':
                  filterCheck = (_item.toString().toLowerCase() === column.filterInput.toLowerCase()) * filterCheck;
                  break;

                default:
                  filterCheck = filterCheck * true;
                  break;
              }
            } else {
              filterCheck = false;
            }
          }

          return filterCheck;
        });
      }

      if (_dataSource.length > 0 && this.sortType && this.sortDataIndex) {
        const _sorted = _dataSource.sort((item, next) => {
          let type = typeof item[this.sortDataIndex];
          if (type === 'string') {
            const _item = item[this.sortDataIndex].toLowerCase();
            const _next = next[this.sortDataIndex].toLowerCase();

            if (_item < _next) {
              return -1;
            }
            if (_item > _next) {
              return 1;
            }

            return 0;
          } else if (type === 'number') {
            return item[this.sortDataIndex] - next[this.sortDataIndex];
          }

          return 0;
        });

        if (this.sortType === 'desc') {
          return _sorted;
        }
        return _sorted.reverse();
      }
      return _dataSource;
    },
  },

  methods: {
    changeSorter(dataIndex) {
      if (this.sortDataIndex === dataIndex) {
        const arrSortType = [null, 'desc', 'asc'];
        const index = arrSortType.findIndex((item) => item === this.sortType);
        if (index === arrSortType.length - 1) {
          this.sortType = null;
          this.sortDataIndex = null;
        } else {
          // Set to next type
          this.sortType = arrSortType[index + 1];
        }
      } else {
        this.sortType = 'desc';
        this.sortDataIndex = dataIndex;
      }
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
  min-width: 350px;
}
table tr th,
table tr td {
  border-bottom: 1px solid #e9ebfa;
  padding: 20px;
}
table tr th:first-child,
table tr td:first-child {
  border-left: 1px solid #e9ebfa;
}
table tr th:last-child,
table tr td:last-child {
  border-right: 1px solid #e9ebfa;
}
table tr th {
  background: #2c3acf;
  border-top: 1px solid #e9ebfa;
  text-align: left;
}

/* top-left border-radius */
table tr:first-child th:first-child {
  border-top-left-radius: 12px;
}

/* top-right border-radius */
table tr:first-child th:last-child {
  border-right: 1px solid #e9ebfa;
  border-top-right-radius: 12px;
}

/* bottom-left border-radius */
table tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

/* bottom-right border-radius */
table tr:last-child td:last-child {
  border-right: 1px solid #e9ebfa;
  border-bottom-right-radius: 12px;
}
</style>
