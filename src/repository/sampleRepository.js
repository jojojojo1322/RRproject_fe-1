import api from '@context/server';
import qs from 'qs';

export const testSample = (param) => {
  const queryString = qs.stringify(param);
  return api().get(`/sample?${queryString}`);
};
