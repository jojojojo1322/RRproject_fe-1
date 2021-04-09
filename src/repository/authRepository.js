import api from '@context/server';

export const getUserInfo = (param) => api().get(`/user?userNo=${param.userNo}`);

export const login = (data) => {
  return api().post('/user/login', data);
};
