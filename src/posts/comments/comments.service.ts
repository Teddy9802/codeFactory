import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { DEFAULT_COMMENT_FIND_OPTIONS } from 'src/posts/comments/const/default-comment-find-options-const';
import { CreateCommentsDto } from 'src/posts/comments/dto/create-comments.dto';
import { PaginateCommentsDto } from 'src/posts/comments/dto/paginate-comments.dto';
import { CommentsModel } from 'src/posts/comments/entity/comments.entity';
import { UsersModel } from 'src/users/entity/users.entity';
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
        ...DEFAULT_COMMENT_FIND_OPTIONS,
      },
      `posts/${postId}/comments`,
    );
  }

  async getCommentById(id: number) {
    const comment = await this.commentsRepository.findOne({
      ...DEFAULT_COMMENT_FIND_OPTIONS,
      where: {
        id,
      },
      relations: {
        author: true,
      },
    });

    if (!comment) {
      throw new BadRequestException(`id: ${id} Comment는 존재하지 않습니다.`);
    }

    return comment;
  }

  async createComment(
    dto: CreateCommentsDto,
    postId: number,
    author: UsersModel,
  ) {
    return this.commentsRepository.save({
      ...dto,
      post: {
        id: postId,
      },
      author,
    });
  }
}
