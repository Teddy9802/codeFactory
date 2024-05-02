import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentsDto } from 'src/posts/comments/dto/create-comments.dto';

export class UpdateCommentsDto extends PartialType(CreateCommentsDto) {}
