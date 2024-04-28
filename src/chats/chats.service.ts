import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { ChatsModel } from 'src/chats/entity/chats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatsModel)
    private readonly chatsRepository: Repository<ChatsModel>,
  ) {}

  async createChat(dto: CreateChatDto) {
    const chat = await this.chatsRepository.save({
      // 1, 2, 3
      //{id:1}, {id:2}, {id:3}
      users: dto.userIds.map((id) => ({ id })),
    });

    return this.chatsRepository.findOne({
      where: {
        id: chat.id,
      },
    });
  }
}
