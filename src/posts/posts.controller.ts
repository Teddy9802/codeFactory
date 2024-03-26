import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // command + . = 임포트 추가, 업데이트해주는 도구
  @Get()
  getPost(): Post {
    return {
      author: 'teddy',
      title: 'house',
      content: 'bear',
      likeCount: 3,
      commentCount: 1,
    };
  }
}
