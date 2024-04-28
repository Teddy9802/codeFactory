import { Controller, Get, Query } from '@nestjs/common';
import { PaginateChatDto } from 'src/chats/dto/paginate-chat.dto';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  paginateChat(@Query() dto: PaginateChatDto) {
    return this.chatsService.paginateChats(dto);
  }
}
