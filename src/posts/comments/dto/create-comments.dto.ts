import { PickType } from '@nestjs/mapped-types';
import { CommentsModel } from 'src/posts/comments/entity/comments.entity';

export class CreateCommentsDto extends PickType(CommentsModel, ['comment']) {}
