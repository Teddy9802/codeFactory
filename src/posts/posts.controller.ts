import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { User } from 'src/users/decorator/user.decorator';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // command + . = 임포트 추가, 업데이트해주는 도구

  // 1)GET /posts -> 모든 post를가져옴.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  // 2)GET /posts/:id -> id에 해당되는 posts를 가져옴, 예를 들어 id=1일 경우 1의 id를 갖고있는 포스트를 겟
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3)POST /posts -> POST를 생성
  @Post()
  @UseGuards(AccessTokenGuard)
  postPosts(
    @User('id') userId: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(userId, title, content);
  }

  //4) PUT /posts/:id -> id에 해당되는 POST를 변경.
  // ?가 뒤에 붙으면 필수적인 요소가 아니게 됨.
  @Put(':id')
  putPost(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(id, title, content);
  }

  //5) DELETE /posts/:id -> id에 해당되는 POST를 삭제.
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
