import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService], //@Injectable을 위한 프로바이더 -> 주입
})
export class PostsModule {}
