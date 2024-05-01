import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { PaginateCommentsDto } from 'src/posts/comments/dto/paginate-comments.dto';
import { CommentsModel } from 'src/posts/comments/entity/comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsModel)
    private readonly commentsRepository: Repository<CommentsModel>,
    private readonly commonService: CommonService,
  ) {}

  paginateComments(
    dto: PaginateCommentsDto, //
    postId: number,
  ) {
    return this.commonService.paginate(
      dto, //
      this.commentsRepository,
      {
        where: {
          post: {
            id: postId,
          },
        },
      },
      `posts/${postId}/comments`,
    );
  }
}
