/* eslint-disable */
import {
  firebaseApp
} from "@/utils/firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    register({ dispatch, commit }, { email, password, name, job }) {
      console.log(email, password, name, job);
    },
  },
};
