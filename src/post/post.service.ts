import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entity/post.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getAllPosts() {
    let getPost = await this.postRepository.find();

    getPost = getPost.filter((post) => {
      return post.scheduledTime < new Date();
    });

    return getPost;
  }

  async createPost(post: CreatePostDto) {
    const savePost = await this.postRepository.save(post);
    if (savePost) return { message: 'Post has been saved' };
    else return { message: "Post couldn't be saved" };
  }

  async getPostById(id: number): Promise<Post> {
    return await this.postRepository.findOne({ where: { id } });
  }

  async deletePost(id: number) {
    const getPost = await this.getPostById(id);

    if (getPost) {
      const deletePost = await this.postRepository.delete({ id });
      if (deletePost.affected)
        return {
          message: 'Post has been deleted',
        };
      else return { message: 'Post could not be deleted' };
    } else
      return {
        message: 'No post has been found associated with this id',
      };
  }

  async updatePost(
    updateUserDto: UpdatePostDto,
    filePath: string,
    param: { postId: number },
  ) {
    const getPost = await this.getPostById(param.postId);

    if (getPost) {
      if (filePath) {
        updateUserDto.imageFile = filePath;
      } else updateUserDto.imageFile = updateUserDto.imageFile;
      const isUpdated = await this.postRepository.update(
        { id: param.postId },
        updateUserDto,
      );
      if (isUpdated) return { message: 'Post has been updated' };
      else return { message: 'Post could not have been updated' };
    } else return { message: 'No post has been found associated with this id' };
  }
}
