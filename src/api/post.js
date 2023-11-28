import { post } from '@/api/index.js';

function createPost(payload) {
  return post.post('', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function updatePost(payload) {
  return post.put('/', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function deletePost(data) {
  return post.delete(`/${data}`);
}

function getPost(payload) {
  return post.get(`/${payload}`);
}

function getPostList(payload) {
  return post.get('', {
    params: {
      page: payload.page,
      type: payload.postType,
    },
  });
}

function requestGetMyPost(data) {
  return post.get(`/my/${data.page}`, {
    params: { name: data.username, postType: data.type },
  });
}

function requestGetMyGoodPost(data) {
  return post.get('/my/good', { params: { name: data } });
}

function requestGetTagPost(data) {
  return post.get('/tag', {
    params: {
      tag: data.tag,
      tagId: data.id,
      page: data.page,
    },
  });
}

export {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getPostList,
  requestGetMyPost,
  requestGetMyGoodPost,
  requestGetTagPost,
};
