import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  //forFeature는 레포지토리를 주입할때 사용
  imports: [
    TypeOrmModule.forFeature([
      PostsModel, //
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService], //@Injectable을 위한 프로바이더 -> 주입
})
export class PostsModule {}
