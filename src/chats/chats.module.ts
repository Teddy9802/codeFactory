import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ChatsGateway } from 'src/chats/chats.gateway';
import { ChatsModel } from 'src/chats/entity/chats.entity';
import { MessagesModel } from 'src/chats/messages/entity/messages.entity';
import { MessagesController } from 'src/chats/messages/messages.controller';
import { ChatsMessagesService } from 'src/chats/messages/messages.service';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatsModel, MessagesModel]),
    CommonModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [ChatsController, MessagesController],
  providers: [
    ChatsGateway,
    ChatsService,
    ChatsMessagesService,
    AuthService,
    JwtService,
  ],
})
export class ChatsModule {}
