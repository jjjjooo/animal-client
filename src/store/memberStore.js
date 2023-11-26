import {
  saveAuthToCookie,
  getAuthFromCookie,
  deleteCookie,
} from '@/utils/cookies.js';

import {
  loginMember,
  getInfo,
  updateMember,
  deleteMember,
} from '@/api/member.js';

const memberStore = {
  state: {
    token: getAuthFromCookie() || '',
    member: {
      id: '',
      name: '',
      profile: '',
    },
  },

  getters: {
    isLogin(state) {
      return state.member.id !== '';
    },
  },

  mutations: {
    SET_LOGIN_MEMBER(state, payload) {
      state.member.id = payload.memberId;
      state.member.name = payload.name;
    },

    CLEAR_MEMBER(state) {
      state.token = '';
      state.member = '';
    },
  },

  actions: {
    async LOGIN(context, memberData) {
      const { data } = await loginMember(memberData);
      saveAuthToCookie(data.token);
      context.commit('SET_LOGIN_MEMBER', data);
      return data;
    },

    async LOGOUT(context) {
      deleteCookie('til_auth');
      context.commit('CLEAR_MEMBER');
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
