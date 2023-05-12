/* eslint-disable */
import { firebaseApp, auth } from "@/utils/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

const database = getDatabase(firebaseApp);

export default {
  state: {
    user: {
      data: null,
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
        dispatch('fetchUserInfo');
      } catch (error) {
        throw error;
      }
    },
    async fetchUserInfo({ dispatch, commit }) {
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
      });
    },
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setUser(state, data) {
      state.user.data = data;
    },
  },
};
