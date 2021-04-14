import api from '@context/server';

export const uploadPassport = (param) => {
  return api('multipart/form-data').post('/util/passport', param);
};

export const emailReAuth = (param) => {
  return api().post('/util/email/pw-auth', param);
};

export const emailUserCheck = (param) => {
  return api().post('/user/duplicate/mailid', param);
};

export const smsAuth = (param) => {
  return api().post('/util/sms/auth', param);
};

export const smsAuthApprove = async (data) => {
  return await api().patch('/util/sms/auth/approve', data);
};

export const smsAuthExpired = async (data) => {
  return await api().patch('/util/sms/auth/expired', data);
};

export const emailAuth = (param) => {
  return api().post('/util/email/auth', param);
};

export const userEmailApprove = (param) => {
  return api().post('/util/email/auth/approve', param);
};

export const userEmailExpired = async (data) => {
  return await api().patch('/util/email/auth/expired', data);
};
