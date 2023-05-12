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
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
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
    getUid() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
  },
};
