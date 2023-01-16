import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { User } from './user/entity/user.entity';
import { Post } from './post/entity/post.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail/mail.service';
import { MailController } from './mail/mail.controller';
import { PostModule } from './post/post.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  controllers: [AppController, MailController],
  providers: [MailService],
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'files'),
    // }),
    MulterModule.register({
      dest: './uploads',
    }),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hello8920',
      database: 'blog',
      entities: [User, Post],
      synchronize: true,
    }),
    AuthModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport:
          'smtps://send.mail.to.verify.email@gmail.com:rxytfhjjolsgbjck@smtp.gmail.com',
        defaults: {
          from: '"BLOG" <modules@nestjs.com>',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    PostModule,
  ],
})
export class AppModule {}
