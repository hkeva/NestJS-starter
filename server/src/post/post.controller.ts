import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  Optional,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  getPosts() {
    return this.postService.getAllPosts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 100000);
          const ext = extname(file.originalname);
          const fileName = `${uniqueSuffix}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  createPosts(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /jpeg|jpg|png|gif/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreatePostDto,
  ) {
    body.imageFile = file.path;
    return this.postService.createPost(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:postId')
  deletePost(@Param() param: { postId: number }) {
    return this.postService.deletePost(param.postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:postId')
  getPost(@Param() param: { postId: number }) {
    return this.postService.getPostById(param.postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:postId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          if (file) {
            const uniqueSuffix =
              Date.now() + Math.round(Math.random() * 100000);

            const ext = extname(file.originalname);
            const fileName = `${uniqueSuffix}${ext}`;
            callback(null, fileName);
          }
        },
      }),
    }),
  )
  update(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })

        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File | null,
    @Body() updateUserDto: UpdatePostDto,
    @Param() param: { postId: number },
  ) {
    // console.log('updateUser body', body);
    // console.log('updateUser file', file);
    // console.log('updateUser post Id', param.postId);

    return this.postService.updatePost(updateUserDto, file.path, param);
  }
}
