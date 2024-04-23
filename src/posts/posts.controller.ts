import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PaginatePostDto } from 'src/posts/dto/paginate-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { User } from 'src/users/decorator/user.decorator';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // command + . = 임포트 추가, 업데이트해주는 도구

  // 1)GET /posts -> 모든 post를가져옴.
  @Get()
  getPosts(@Query() query: PaginatePostDto) {
    return this.postsService.paginatePosts(query);
  }

  @Post('random')
  @UseGuards(AccessTokenGuard)
  async postPostsRandom(@User('id') userId: number) {
    await this.postsService.generatePosts(userId);

    return true;
  }

  // 2)GET /posts/:id -> id에 해당되는 posts를 가져옴, 예를 들어 id=1일 경우 1의 id를 갖고있는 포스트를 겟
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3)POST /posts -> POST를 생성
  // DTO - Data Transfer Object 데이터를 전송하는 객체
  @Post()
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('image'))
  postPosts(
    @User('id') userId: number,
    @Body() body: CreatePostDto,
    @UploadedFile() file?: Express.Multer.File,
    // @Body('title') title: string,
    // @Body('content') content: string,
  ) {
    return this.postsService.createPost(userId, body, file?.filename);
  }

  //4) PATCH /posts/:id -> id에 해당되는 POST를 변경.
  // ?가 뒤에 붙으면 필수적인 요소가 아니게 됨.
  @Patch(':id')
  patchPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
    // @Body('title') title?: string,
    // @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(id, body);
  }

  //5) DELETE /posts/:id -> id에 해당되는 POST를 삭제.
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
