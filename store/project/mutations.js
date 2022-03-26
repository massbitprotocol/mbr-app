import _ from 'lodash';

export default {
  setList(state, list) {
    const _list = _.cloneDeep(list);

    state.list = _list;
  },

  setProject(state, project) {
    const _project = _.cloneDeep(project);
    const _list = _.cloneDeep(state.list);
    _list.push(_project);

    this.$cookies.set('current_project', _project.id);
    state.project = _project;
    state.list = _list;
  },

  selectProject(state, project) {
    const _project = _.cloneDeep(project);

    this.$cookies.set('current_project', _project.id);
    state.project = _project;
  },
};
