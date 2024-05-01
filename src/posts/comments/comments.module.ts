import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModel } from 'src/posts/comments/entity/comments.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsModel])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
