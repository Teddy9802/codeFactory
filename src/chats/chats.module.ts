import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsGateway } from 'src/chats/chats.gateway';
import { ChatsModel } from 'src/chats/entity/chats.entity';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatsModel])],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
