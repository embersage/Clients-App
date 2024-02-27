import { $authHost } from './index';

export const sendMail = async (to, templateId, params) => {
  const { data } = await $authHost.post('api/email/send-email', {
    to,
    templateId,
    params,
  });
  return data.message;
};
