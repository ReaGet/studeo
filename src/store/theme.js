export default {
  state: {
    theme: 'light',
  },
  actions: {
    updateTheme({ commit, getters }, theme) {
      localStorage.setItem('theme', theme);
      document.body.classList.replace(getters.theme, theme);
      commit('setTheme', theme);
    },
    loadTheme({ dispatch }) {
      const theme = localStorage.getItem('theme') || 'light';
      dispatch('updateTheme', theme);
    },
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    },
  },
  getters: {
    theme: (state) => state.theme,
  },
};
