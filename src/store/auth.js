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
    async register({ dispatch, commit }, { email, password, name, job }) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        commit('setUser', response.user);
        const uid = response.user.uid;
        await set(ref(database, `/users/${uid}/info`), {
          job,
          name,
        });
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
          commit('setUser', {
            name: data.name,
            job: data.job,
            email: user.email
          });
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
