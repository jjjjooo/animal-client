import axios from 'axios';

import { setIntercepotors } from '@/api/common/interceptors.js';

//일반
function createInstance() {
  const instance = axios.create();
  return instance;
}
//회원
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `/api/${url}`,
  });

  return setIntercepotors(instance);
}

export const instance = createInstance();
export const member = createInstanceWithAuth('members');
export const posts = createInstanceWithAuth('posts');
export const chatting = createInstanceWithAuth('chats');
