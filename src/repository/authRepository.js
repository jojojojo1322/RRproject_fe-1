import api from '@context/server';

export const getUserInfo = (param) => api().get(`/user?userNo=${param.userNo}`);

export const login = (data) => {
  return api().post('/user/login', data);
};

export const signUp = (param) => {
  return api().post('/user/register', param);
};

export const signUpDeviceKey = (param) =>
  api().get(`/user/register/device-key?reqDevicekey=${param.deviceKey}`);

export const pwReSetting = async (param) => {
  return await api().patch(`/user/${param.userNo}`, param);
};
