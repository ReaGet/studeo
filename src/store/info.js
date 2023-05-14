/* eslint-disable */
import { database } from "@/utils/firebase";
import {
  ref,
  set,
  onValue,
  query,
  orderByChild,
  equalTo
} from "firebase/database";

export default {
  state: {
    user: {
    },
  },
  actions: {
    async updateInfo({ dispatch, commit }, data) {
      const params = {};
      Object.keys(data).forEach((key) => {
        data[key] && (params[key] = data[key]);
      });
      try {
        const uid = await dispatch('getUid');
        await set(ref(database, `/users/${uid}/info`), params);
        dispatch('fetchInfo');
      } catch (error) {
        throw error;
      }
    },
    async fetchInfo({ dispatch, commit }, callback) {
      const uid = await dispatch('getUid');
      const info = ref(database, `users/${uid}/info`);
      onValue(info, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const params = {};
          Object.keys(data).forEach((key) => {
            data[key] && (params[key] = data[key]);
          });
          commit('setUser', params);
        } else {
          commit('setUser', null);
        }
        callback && callback();
      });
    },
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
  },
};
