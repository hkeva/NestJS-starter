import {
  Body,
  ConsoleLogger,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
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
  //dependency injection
  constructor(
    private userService: UserService,
    private mailService: MailService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  getUsers() {
    return this.userService.getAllUsers();
  }

  // @Patch('/:userId')
  // update(
  //   @Body() updateUserDto: UpdateUserDto,
  //   @Param() param: { userId: number },
  // ) {
  //   return this.userService.update(updateUserDto, param);
  // }

  @Post('')
  async store(@Body() body: CreateUserDto) {
    const getUser = await this.userService.getUserByEmail(body.email);
    if (getUser) {
      if (getUser.isVerified) return { message: 'User already exists' };
      else return { message: 'Please verify your email' };
    } else if (body.password !== body.confirmPassword)
      return { message: "Password and confirm password don't match" };
    else {
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

  // @Get('/:userId')
  // getUser(@Param() params: { userId: number }) {
  //   return params;
  // }

  @Get('verifyEmail')
  async userVerification(@Query('email') email, @Query('token') token) {
    const getUser = await this.userService.getUserByEmail(email);

    if (getUser) {
      if (getUser.isVerified) {
        return { message: 'User is already verified' };
      } else if (getUser.emailVerificationToken === token) {
        const isVerified = await this.userService.verifyUser(email);

        if (isVerified) {
          if (new Date() > getUser.emailVerificationTokenExpiredAt) {
            return { message: 'Token has been expired' };
          } else {
            await this.userService.clearEmailVerificationToken(getUser.email);
            return {
              message: 'user is verified',
            };
          }
        } else return { message: 'user is not verified' };
      } else return { message: 'Invalid token' };
    } else return { message: 'User does not exist' };
  }
}
