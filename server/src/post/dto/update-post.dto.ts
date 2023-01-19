import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  imageFile: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  commentIds: string[];

  @IsOptional()
  scheduledTime: string;
}
