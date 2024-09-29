import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, token: string) {
    const result = await this.mailerService.sendMail({
      to: email,
      subject: 'Greeting...',

      text:
        'http://localhost:5000/user/verifyEmail?email=' +
        email +
        '&token=' +
        token,
      // html: `<p>Hello  ${{
      //   name,
      // }} <a href="https://www.google.com">please verify here</a></p>`,

      // template: join(__dirname, '/templates/email'),
      // context: {
      //   name: name,
      // },
    });

    if (result) return { message: 'A mail has been sent!' };
    else return { message: 'Mail could not be sent!' };
  }
}
