import api from '@context/server';

export const appInfo = async (data) => {
  return await api().get('/app-info');
};
