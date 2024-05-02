// Pick, Omit, Partial -> Type 반환
// PickType, OmitType, PartialType -> 값을 반환

import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { PostsModel } from 'src/posts/entity/posts.entity';

export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {
  @IsString({
    each: true,
  })
  @IsOptional()
  images: string[] = [];
}
