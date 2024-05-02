import { CommentsModel } from 'src/posts/comments/entity/comments.entity';
import { FindManyOptions } from 'typeorm';

export const DEFAULT_COMMENT_FIND_OPTIONS: FindManyOptions<CommentsModel> = {
  relations: {
    author: true,
  },
  select: {
    author: {
      id: true,
      nickname: true,
    },
  },
};
