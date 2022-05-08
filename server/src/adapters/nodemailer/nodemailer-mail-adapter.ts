import { MailAdapter, SendMailData } from '../mail.adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3074e458f36561",
    pass: "ad33bd77fd0e10"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedger.com>',
      to: 'MWS <mws.manfio@gmail.com>',
      subject: subject,
      html: body,
    })
  }
}