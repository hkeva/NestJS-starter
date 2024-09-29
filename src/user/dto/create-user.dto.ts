import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Match } from '../../customDecorator/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: 'Password and confirm password must match' })
  confirmPassword: string;

  @IsOptional()
  emailVerificationToken: string;

  @IsOptional()
  emailVerificationTokenExpiredAt: Date;
}
