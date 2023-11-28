import chat from '@/api/chat.js';
import router from '@/router/index';

const chatStore = {
  state: {
    chatLogList: [],
    newChatLogList: [],
    chatRoomList: [],
    chatRoomDetails: '',
    chatCount: '',
  },
  mutations: {
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

    async REQUEST_ADD_CHATROOM(context, payload) {
      const response = await chat.requestAddChatRoom(
        payload,
      );
      context.commit('SET_CHAT_ROOM_DETAIL', response.data);
      await router.push({
        path: '/chat',
        query: {
          roomId: response.data.id,
        },
      });
    },

    async REQUEST_GET_CHAT_LOG_LIST(context, payload) {
      const response = await chat.requestGetChatLogs(
        payload,
      );
      context.commit('SET_CHAT_ROOM_DETAIL', response.data);
      context.commit('SET_CHAT_LOG_LIST', response.data);
    },

    async REQUEST_GET_CHAT_ROOM_LIST(context, payload) {
      console.log(payload);
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
