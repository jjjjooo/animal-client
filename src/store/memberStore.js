import {
  saveAuthToCookie,
  deleteCookie,
} from '@/utils/cookies.js';

import { loginMember } from '@/api/member.js';

const memberStore = {
  state: {
    memberId: '',
    memberName: '',
    memberProfile: '',
  },

  getters: {
    isLogin(state) {
      return state.memberId !== '';
    },
  },

  mutations: {
    SET_LOGIN_MEMBER(state, payload) {
      state.memberId = payload.memberId;
      state.memberName = payload.name;
    },

    CLEAR_MEMBER(state) {
      state.token = '';
      state.memberId = '';
      state.memberName = '';
      state.memberProfile = '';
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
  },
};

export default memberStore;
