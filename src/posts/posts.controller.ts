import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'teddy',
    title: 'bear',
    content: 'dad',
    likeCount: 1111,
    commentCount: 123,
  },
  {
    id: 2,
    author: 'teddy2',
    title: 'bear2',
    content: 'dad2',
    likeCount: 1111,
    commentCount: 123,
  },
  {
    id: 3,
    author: 'teddy3',
    title: 'bear3',
    content: 'dad3',
    likeCount: 1111,
    commentCount: 123,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // command + . = 임포트 추가, 업데이트해주는 도구

  // 1)GET /posts -> 모든 post를가져옴.
  @Get()
  getPosts() {
    return posts;
  }

  // 2)GET /posts/:id -> id에 해당되는 posts를 가져옴, 예를 들어 id=1일 경우 1의 id를 갖고있는 포스트를 겟
  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  // 3)POST /posts -> POST를 생성
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  //4) PUT /posts/:id -> id에 해당되는 POST를 변경.
  // ?가 뒤에 붙으면 필수적인 요소가 아니게 됨.
  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));

    return post;
  }

  //5) DELETE /posts/:id -> id에 해당되는 POST를 삭제.
}
