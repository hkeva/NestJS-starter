import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  createNewUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async verifyUser(email: string): Promise<User> {
    const getUser = await this.getUserByEmail(email);
    getUser.isVerified = true;
    const isVerified = await this.userRepository.save(getUser);
    return isVerified;
  }

  async clearEmailVerificationToken(email: string): Promise<User> {
    const getUser = await this.getUserByEmail(email);
    getUser.emailVerificationToken = null;
    getUser.emailVerificationTokenExpiredAt = null;
    const tokensCleared = await this.userRepository.save(getUser);
    return tokensCleared;
  }
}
