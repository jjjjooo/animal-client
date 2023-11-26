import { member } from '@/api/index.js';

function registerMember(memberData) {
  return member.post('/sign-up', memberData);
}

function loginMember(memberData) {
  return member.post('/login', memberData);
}

function getInfo() {
  return member.get('/');
}

function updateMember(memberData) {
  return member.put('/', memberData);
}

function deleteMember(memberData) {
  return member.delete('/', {
    params: { password: memberData.password },
  });
}

export {
  registerMember,
  loginMember,
  getInfo,
  updateMember,
  deleteMember,
};
