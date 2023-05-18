/* eslint-disable */
import { database, auth } from "@/utils/firebase";
import {
  ref,
  set,
  onValue,
} from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
  state: {
    groups: {},
    user: {},
  },
  actions: {
    async updateInfo({ dispatch, commit }, data) {
      const params = {};
      Object.keys(data).forEach((key) => {
        data[key] && (params[key] = data[key]);
      });
      try {
        const uid = await dispatch('getUid');
        if(typeof params.avatar !== 'string') {
          dispatch('uploadImage',
            {
              user: params,
              callback: (imageUrl) => {
                if (imageUrl) {
                  params.avatar = imageUrl;
                }
                console.log(params);
                set(ref(database, `/users/${uid}/info`), params);
                dispatch('fetchInfo');
              }
            });
        } else {
          set(ref(database, `/users/${uid}/info`), params);
          dispatch('fetchInfo');
        }
      } catch (error) {
        throw error;
      }
    },
    uploadImage(context, { user, callback }) {
      const storage = getStorage();
      if (!user.avatar) {
        callback();
        return;
      }
      const imageRef = storageRef(storage, `images/${user.avatar.name}`);
      const uploadTask = uploadBytesResumable(imageRef, user.avatar);
      uploadTask.on('state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              callback(downloadURL);
            });
          }
        );
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
          params.uid = uid;
          commit('setUser', params);
        } else {
          commit('setUser', null);
        }
        // if (data.job === 'teacher') {
        //   dispatch('fetchTeacherGroups', callback);
        // } else {
          callback && callback();
        // }
      });
    },
    async updateGroups({ dispatch, commit }, data) {
      try {
        const uid = await dispatch('getUid');
        set(ref(database, `/users/${uid}/groups`), data);
      } catch (error) {
        throw error;
      }
    },
    async fetchTeacherGroups({ dispatch, commit }, callback) {
      const uid = await dispatch('getUid');
      const groups = ref(database, `users/${uid}/groups`);
      onValue(groups, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const params = [];
          Object.keys(data).forEach((key) => {
            params.push(data[key]);
          });
          commit('setGroups', params);
          callback && callback();
        } else {
          commit('setGroups', null);
        }
      });
    }
  },
  getters: {
    user: (state) => state.user,
    loaded: (state) => state.user?.loaded || !auth.currentUser,
  },
  mutations: {
    setUser(state, data) {
      state.user = { ...data, loaded: true };
    },
    setGroups(state, data) {
      state.groups = data;
    },
  },
};
