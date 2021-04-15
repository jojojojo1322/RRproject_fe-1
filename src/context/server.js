import axios from 'axios';

export const server = 'http://54.169.7.94:80/v1/api';

const api = (contentType = 'application/json') => {
  return axios.create({
    baseURL: server,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      'Access-Control-Allow-Headers':
        'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization',
    },
    //쿠키 전송 관련 문제 발생 시 withCredentials옵션을 줘야합니다.
    // withCredentials: true,
  });
};

export default api;
