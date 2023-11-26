import { chatting } from '@/api/index';

function requestAddChatRoom(data) {
  return chatting.post('/', data);
}

function requestGetChatLogs(data) {
  return chatting.get(`/${data.roomId}`, {
    params: { name: data.username },
  });
}

function requestGetChatRooms(data) {
  return chatting.get('/', {
    params: { name: data },
  });
}

function requestGetNotReadCount(data) {
  return chatting({
    url: 'read',
    method: 'GET',
    params: { name: data },
  });
}

function requestReadAllMessage(data) {
  return chatting.post(`/${data}`);
}

export default {
  requestAddChatRoom,
  requestGetChatLogs,
  requestGetChatRooms,
  requestGetNotReadCount,
  requestReadAllMessage,
};
