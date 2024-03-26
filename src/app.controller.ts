import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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

// 컨트롤러 뒤에 괄호안은 접두어 역할을 함.
@Controller('post')
export class AppController {
  constructor(private readonly appService: AppService) {}

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
