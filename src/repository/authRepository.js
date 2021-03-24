import api from '@context/server';

export const getUserInfo = (param) => api().get('/v1/api/user', param);

export const login = (data) => {
  return api().post('/v1/api/user/login', data);
};
