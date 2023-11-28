import {
  getPost,
  getPostList,
  //requestGood,
  deletePost,
  updatePost,
  requestGetMyPost,
  requestGetMyGoodPost,
  requestGetTagPost,
} from '@/api/post';

const postStore = {
  state: {
    tagList: null,
    searchList: [],
    missingPostList: [],
    protectPostList: [],
    postDetail: '',
    myPostList: [],
    myGoodPostList: '',
    postTotalPage: 0,
    postCurrentPage: 1,
    postGood: false,
    myPostTotalPage: 1,
    myPostCurrentPage: 1,
    address: '',
  },
  getters: {
    good(state) {
      return state.postGood;
    },
  },
  mutations: {
    SET_POST_SEARCH(state, payload) {
      state.searchList = payload;
    },
    SET_MISSING_POST_LIST(state, payload) {
      state.missingPostList = payload;
    },
    SET_PROTECT_POST_LIST(state, payload) {
      state.protectPostList = payload;
    },
    SET_POST_DETAIL(state, payload) {
      state.postDetail = payload;
    },
    SET_MY_POST_LIST(state, payload) {
      state.myPostList = payload;
    },
    SET_MY_GOOD_POST_LIST(state, payload) {
      state.myGoodPostList = payload;
    },
    SET_POST_TOTAL_PAGE(state, payload) {
      state.postTotalPage = payload;
    },
    SET_POST_CURRENT_PAGE(state, payload) {
      state.postCurrentPage = payload;
    },
    SET_POST_GOOD(state, payload) {
      state.postGood = payload;
    },
    SET_MY_POST_TOTAL_PAGE(state, payload) {
      state.myPostTotalPage = payload;
    },
    SET_TAG_SEARCH(state, payload) {
      state.tagList = payload;
    },
  },

  actions: {
    async REQUEST_GET_POSTDETAIL({ commit }, payload) {
      const { data } = await getPost(payload);
      commit('SET_POST_GOOD', data.good);
      commit('SET_POST_DETAIL', data);
    },

    async REQUEST_GET_MISSING_POST_LIST(
      { commit },
      payload,
    ) {
      const response = await getPostList(payload);
      console.log(response.data);
      commit('SET_MISSING_POST_LIST', response.data);
    },

    async REQUEST_GET_PROTECT_POST_LIST(
      { commit },
      payload,
    ) {
      const response = await getPostList(payload);
      console.log(response.data);
      commit('SET_PROTECT_POST_LIST', response.data);
    },

    async REQUEST_GET_SEARCH_POST({ commit }, payload) {
      const response = await getPostList(payload);
      console.log(response.data);
      commit('SET_POST_SEARCH', response.data);
      commit(
        'SET_POST_TOTAL_PAGE',
        response.data.totalPage,
      );
    },

    async REQUEST_DELETE_POST(context, payload) {
      const response = await deletePost(payload);
      if (response) {
        alert('정상적으로 삭제되었습니다.');
      }
      await this.router.push('/protect-post');
    },

    async REQUEST_UPDATE_POST(context, payload) {
      const response = await updatePost(payload);
      if (response) {
        alert('정상적으로 수정되었습니다.');
      }
    },

    async REQUEST_GET_MY_POST(context, payload) {
      const response = await requestGetMyPost(payload);

      if (response) {
        context.commit('SET_MY_POST_LIST', response.data);
        context.commit(
          'SET_MY_POST_TOTAL_PAGE',
          response.data.totalPage,
        );
      }
    },

    async REQUEST_GET_TAG_POST(context, paylod) {
      const { data } = await requestGetTagPost(paylod);
      console.log(data);
      context.commit('SET_TAG_SEARCH', data);
    },

    async REQUEST_GET_MY_GOOD_POST(context, payload) {
      const response = await requestGetMyGoodPost(payload);

      if (response) {
        context.commit(
          'SET_MY_GOOD_POST_LIST',
          response.data,
        );
      }
    },
  },
};
export default postStore;
