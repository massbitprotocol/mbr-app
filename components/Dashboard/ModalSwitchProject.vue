<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold">Switch project</div>

        <div
          @click="_visible = false"
          class="flex items-center text-neutral-darkset cursor-pointer"
          v-html="require(`~/assets/svg/icon/close.svg?raw`)"
        ></div>
      </div>

      <div class="mt-5">
        <div class="mb-5">
          <select
            v-model="projectId"
            class="h-[40px] flex items-center mt-2 w-full px-3 cursor-pointer border border-primary-background rounded text-body-2 text-neutral-darker font-medium"
          >
            <option v-for="project in projectList" :key="`project-${project.id}`" :value="project.id">
              {{ project.name }}
            </option>
          </select>
        </div>

        <div class="flex flex-wrap -mx-3">
          <div class="w-full flex justify-end px-3">
            <BaseButton class="w-[189px] h-[40px]" :loading="loading" @click="setCurrentProject"> Confirm </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </TheModal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DashboardModalSwitchProject',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      projectId: '',
      loading: false,
    };
  },

  watch: {
    visible(value) {
      if (value && this.project) {
        this.projectId = `${this.project.id}`;
      }
    },
  },

  computed: {
    ...mapGetters({
      projectList: 'project/list',
      project: 'project/value',
    }),
    _visible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      },
    },
  },

  methods: {
    setCurrentProject() {
      const project = this.projectList.find((_project) => _project.id === this.projectId);
      if (project) {
        this.$store.commit('project/selectProject', project);
        this._visible = false;
      }
    },
  },
};
</script>
