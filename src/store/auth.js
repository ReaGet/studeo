/* eslint-disable */
import firebaseApp from "@/utils/firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        throw error;
      }
    },
    async logout({commit}) {
      await signOut(auth);
      commit("clearInfo");
    },
    async register({ dispatch, commit }, { email, password, name, job }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch("getUid");
        await set(ref(database, `/users/${uid}/info`), {
          job,
          name,
        });
      } catch (error) {
        throw error;
      }
    },
    async getUid() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
  },
};
