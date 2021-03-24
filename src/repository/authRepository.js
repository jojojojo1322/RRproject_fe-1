import api from '@context/server';

export const ApiInfo = (param) => api().get('/v1/api/user', param);

export const ApiLogin = (data) => {
  return api().post('/v1/api/user/login', data);
};
