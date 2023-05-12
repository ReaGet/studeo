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
      loggedIn: false,
      data: null,
    },
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        dispatch('fetchUserInfo');
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit('setUser', null);
    },
    async register({ dispatch, commit }, data) {
      const params = {};
      Object.keys(data).forEach((key) => {
        if (key !== 'password') {
          data[key] && (params[key] = data[key]);
        }
      });
      try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        const uid = await dispatch('getUid');
        await set(ref(database, `/users/${uid}/info`), params);
        dispatch('fetchUserInfo');
      } catch (error) {
        throw error;
      }
    },
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
        commit('setLoggedIn', !!uid);
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
    getUid() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data) {
      state.user.data = data;
    },
  },
};
