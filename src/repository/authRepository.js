import api from '@context/server';

export const getUserInfo = (param) => {
  return api().get(`/user/${param.userNo}`);
};

export const login = (data) => {
  return api().post('/user/login', data);
};
