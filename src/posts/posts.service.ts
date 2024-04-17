import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PaginatePostDto } from 'src/posts/dto/paginate-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { MoreThan, Repository } from 'typeorm';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

export interface PostModel {
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

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>, //
  ) {}

  async getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }
  //1) 오름차 순으로 정렬하는 pagination만 구현한다.
  async paginatePosts(dto: PaginatePostDto) {
    // 1, 2, 3, 4, 5
    const posts = await this.postsRepository.find({
      where: {
        // 더 크다 / 더 많다
        id: MoreThan(dto.where__id_more_than ?? 0),
      },
      // order__createdAt
      order: {
        createdAt: dto.order__createAt,
      },
      take: dto.take,
    });
    /**
     * Response
     *
     * data:data[],
     * cursor: {
     *      after: 마지막 Data와 ID
     * },
     * count: 응답한 데이터의 갯수
     * next: 다음 요청을 할때 사용할 URL
     *
     */
    return {
      data: posts,
    };
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(authorId: number, postDto: CreatePostDto) {
    //1) create -> 저장할 객체를 생성한다.
    //2) save -> 객체를 저장한다.(create 매서드에서 생성한 객체로)

    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...postDto,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(postId: number, postDto: UpdatePostDto) {
    const { title, content } = postDto;

    // save의 기능
    // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트 한다.

    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }
}
