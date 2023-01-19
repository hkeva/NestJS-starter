import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { httpResponse } from 'src/httpsResponse';
import { validationMessages } from 'src/validationMessages';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// console.log(
//   'process.env',
//   Number(process.env.EMAIL_VERIFICATION_LINK_EXPIRATION_TIME),
//   typeof Number(process.env.EMAIL_VERIFICATION_LINK_EXPIRATION_TIME),
// );

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private mailService: MailService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post('')
  async store(@Body() body: CreateUserDto, @Res() res: Response) {
    const getUser = await this.userService.getUserByEmail(body.email);

    if (getUser) {
      if (getUser.isVerified)
        res
          .status(HttpStatus.BAD_REQUEST)
          .send(
            httpResponse(
              HttpStatus.BAD_REQUEST,
              validationMessages.userAlreadyExists,
            ),
          );
      else
        res
          .status(HttpStatus.BAD_REQUEST)
          .send(
            httpResponse(
              HttpStatus.BAD_REQUEST,
              validationMessages.verifyEmail,
            ),
          );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { v4: uuidv4 } = require('uuid');
      const token = uuidv4();
      delete body.confirmPassword;
      const hashedPassword = await bcrypt.hash(body.password, 10);

      const date = new Date();
      date.setHours(date.getHours() + 1);

      this.userService.createNewUser({
        ...body,
        password: hashedPassword,
        emailVerificationToken: token,
        emailVerificationTokenExpiredAt: date,
      });
      const emailSent = this.mailService.sendMail(body.email, token);
      return emailSent;
    }
  }

  @Get('verifyEmail')
  async userVerification(
    @Query('email') email,
    @Query('token') token,
    @Res() res: Response,
  ) {
    const getUser = await this.userService.getUserByEmail(email);

    if (getUser) {
      if (getUser.isVerified) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(
            httpResponse(
              HttpStatus.BAD_REQUEST,
              validationMessages.userAlreadyExists,
            ),
          );
      } else if (getUser.emailVerificationToken === token) {
        const isVerified = await this.userService.verifyUser(email);

        if (isVerified) {
          if (new Date() > getUser.emailVerificationTokenExpiredAt) {
            return res
              .status(HttpStatus.BAD_REQUEST)
              .send(
                httpResponse(
                  HttpStatus.BAD_REQUEST,
                  validationMessages.tokenExpired,
                ),
              );
          } else {
            await this.userService.clearEmailVerificationToken(getUser.email);
            return res
              .status(HttpStatus.BAD_REQUEST)
              .send(
                httpResponse(
                  HttpStatus.BAD_REQUEST,
                  validationMessages.userVerified,
                ),
              );
          }
        } else
          return res
            .status(HttpStatus.BAD_REQUEST)
            .send(
              httpResponse(
                HttpStatus.BAD_REQUEST,
                validationMessages.userNotVerified,
              ),
            );
      } else
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(
            httpResponse(
              HttpStatus.BAD_REQUEST,
              validationMessages.invalidToken,
            ),
          );
    } else
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(
          httpResponse(
            HttpStatus.BAD_REQUEST,
            validationMessages.userDoesNotExist,
          ),
        );
  }
}
