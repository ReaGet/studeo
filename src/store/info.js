/* eslint-disable */
import { firebaseApp } from "@/utils/firebase";
import {
  getDatabase,
  ref,
  set,
  onValue,
  query,
  orderByChild,
  equalTo
} from "firebase/database";

const database = getDatabase(firebaseApp);

export default {
  state: {
    user: {
      data: null,
      friends: null,
    },
  },
  actions: {
    init({ dispatch }) {
      return Promise.all([
        dispatch('fetchUserInfo'),
      ]);
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
        if (data) {
          const params = {};
          Object.keys(data).forEach((key) => {
            data[key] && (params[key] = data[key]);
          });
          commit('setUser', params);
          dispatch('fetchFriends');
        } else {
          commit('setUser', null);
        }
      });
    },
    async fetchFriends({ dispatch, commit, getters }) {
      const group = getters.user.data.group;
      const friendsQuery = query(
        ref(database, 'users'),
        orderByChild('info/group'),
        equalTo(group),
      );
      onValue(friendsQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const friends = [];
          Object.keys(data).forEach((id) => {
            friends.push({
              id,
              ...data[id].info
            })
          });
          commit('setFriends', friends);
        } else {
          // commit('setUser', null);
        }
      });
    },
  },
  getters: {
    user: (state) => state.user,
    friend: (state) => {
      return (id) => {
        return state.user.friends.filter((friend) => {
          return friend.id === id;
        });
      };
    },
  },
  mutations: {
    setUser(state, data) {
      state.user.data = data;
    },
    setFriends(state, data) {
      state.user.friends = data;
    },
  },
};
