import { Resend } from 'resend';

const apiKey = import.meta.env.RESEND_API_KEY ?? "";
const resend = new Resend(apiKey);

export async function sendEmailRecover(email: string, token: string) {
  const { error } = await resend.emails.send({
    from: 'Kanbaru Library <r-social@r-social.nextstep-web.online>',
    to: [email],
    subject: 'Código de recuperación',
    text: `Tu código de recuperación es: ${token}`
  });

  if (error !== null) {
    return false; 
  }

  return true;
};