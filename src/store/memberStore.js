import {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
} from '@/utils/cookies.js';
import {
  loginMember,
  getInfo,
  updateMember,
  deleteMember,
} from '@/api/member.js';

const memberStore = {
  state: {
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    address: '',
    info: [],
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    setMembername(state, username) {
      state.username = username;
    },
    clearMember(state) {
      state.username = '';
      state.token = '';
    },
    setToken(state, token) {
      state.token = token;
    },
    setArea(state, payload) {
      state.address = payload;
    },
    setInfo(state, payload) {
      state.info = payload;
    },
  },

  actions: {
    async LOGIN({ commit }, memberData) {
      const { data } = await loginMember(memberData);
      console.log(data);
      commit('setToken', data.token);
      commit('setMembername', data.name);
      commit('setArea', data.address);
      saveAuthToCookie(data.token);
      saveUserToCookie(data.name);
      return data;
    },
    async GET_INFO({ commit }, memberData) {
      const { data } = await getInfo(memberData);

      commit('setInfo', data);
    },
    async UPDATE(memberData) {
      await updateMember(memberData);
    },
    async DELETE(memberData) {
      await deleteMember(memberData);
    },
  },
};

export default memberStore;
