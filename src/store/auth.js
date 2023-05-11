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
    async login({ commit }, { email, password }) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        commit('setUser', response.user);
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
        const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
        commit('setUser', response.user);
        const uid = response.user.uid;
        await set(ref(database, `/users/${uid}/info`), params);
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
        commit('setUser', params);
        const uid = auth.currentUser.uid;
        await set(ref(database, `/users/${uid}/info`), params);
      } catch (error) {
        throw error;
      }
    },
    async fetchUser({ dispatch, commit }, user) {
      if (!user) {
        return;
      }
      const info = ref(database, `users/${user.uid}/info`);
      onValue(info, (snapshot) => {
        const data = snapshot.val();
        commit('setLoggedIn', user !== null);
        if (user) {
          console.log(data);
          const params = {};
          if (data) {
            Object.keys(data).forEach((key) => {
              data[key] && (params[key] = data[key]);
            });
          }
          console.log(params);
          commit('setUser', params);
        } else {
          commit('setUser', null);
        }
      });
    }
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
