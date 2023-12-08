import chat from '@/api/chat.js';

const chatStore = {
  state: {
    showChatComponent: false,
    chatLogList: [],
    newChatLogList: [],
    chatRoomList: [],
    chatRoomDetails: '',
    chatCount: '',
    selectedRoomDeatil: '',
  },
  getters: {
    getShowChatStatus(state) {
      return state.showChatComponent;
    },
  },
  mutations: {
    SET_SELECTED_ROOM_DETAIL(state, payload) {
      state.selectedRoomDeatil = payload;
    },
    SET_CHAT_DIALOG_STATUS(state, payload) {
      state.showChatComponent = payload;
    },
    CLEAR_STATE(state) {
      state.chatLogList = null;
      state.newChatLogList = null;
      state.chatRoomDetail = null;
    },
    SET_CHAT_ROOM_LIST(state, payload) {
      state.chatRoomList = payload;
    },
    SET_CHAT_LOG_LIST(state, payload) {
      state.chatLogList = payload;
    },
    SET_CHAT_COUNT(state, payload) {
      state.chatCount = payload;
    },
    SET_CHAT_ROOM_DETAIL(state, payload) {
      state.chatRoomDetail = payload;
    },
    ADD_CHAT_MESSAGE(state, message) {
      state.chatLogList.push(message);
    },
    ADD_NEW_CHAT(state, payload) {
      const targetChatRoom = state.chatRoomList.find(
        chatRoom => chatRoom.chatRoomId === payload.roomId,
      );
      if (
        targetChatRoom &&
        payload.messageType === 'MESSAGE'
      ) {
        targetChatRoom.lastMessage = payload.message;
        targetChatRoom.modifiedAt = payload.modifiedAt;
        targetChatRoom.notReadCount++;
      }
    },

    READ_OLD_MESSAGE(state, payload) {
      const targetChatRoom = state.chatRoomList.find(
        chatRoom => chatRoom.chatRoomId === payload.roomId,
      );
      state.chatLogList.forEach(chatLog => {
        if (targetChatRoom == chatLog.roomId) {
          chatLog.checked = true;
        }
      });
    },
  },

  actions: {
    OPEN_CHAT_DIALOG(context) {
      context.commit('SET_CHAT_DIALOG_STATUS', true);
    },
    CLOSE_CHAT_DIALOG(context) {
      context.commit('SET_CHAT_DIALOG_STATUS', false);
    },
    RESPONSE_MESSAGE(context, payload) {
      context.commit('ADD_CHAT_MESSAGE', payload);
    },
    READ_ALL_MESSAGE(context, payload) {
      chat.requestReadAllMessage(payload);
      context.commit('READ_OLD_MESSAGE', payload);
    },
    ADD_NEW_CHAT(context, payload) {
      context.commit('ADD_NEW_CHAT', payload);
    },
    ADD_SELECTED_ROOM_DEATIL(context, payload) {
      context.commit('SET_SELECTED_ROOM_DETAIL', payload);
    },
    async REQUEST_ADD_CHATROOM(context, payload) {
      const response = await chat.requestAddChatRoom(
        payload,
      );
      await context.commit(
        'SET_CHAT_ROOM_DETAIL',
        response.data,
      );
      context.commit('SET_CHAT_DIALOG_STATUS', true);
    },

    async REQUEST_GET_CHAT_LOG_LIST(context, payload) {
      const response = await chat.requestGetChatLogs(
        payload,
      );
      context.commit('SET_CHAT_ROOM_DETAIL', response.data);
      context.commit('SET_CHAT_LOG_LIST', response.data);
    },

    async REQUEST_GET_CHAT_ROOM_LIST(context, payload) {
      const response = await chat.requestGetChatRooms(
        payload,
      );
      context.commit('SET_CHAT_ROOM_LIST', response.data);
    },

    async REQUEST_GET_CHAT_COUNT(context, payload) {
      const response = await chat.requestGetNotReadCount(
        payload,
      );
      context.commit('SET_CHAT_COUNT', response.data);
    },
  },
};

export default chatStore;
