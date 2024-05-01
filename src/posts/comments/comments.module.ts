import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { CommentsModel } from 'src/posts/comments/entity/comments.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsModel]), CommonModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
