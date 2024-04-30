import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { ChatsService } from 'src/chats/chats.service';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { EnterChatDto } from 'src/chats/dto/enter-chat.dto';
import { CreateMessagesDto } from 'src/chats/messages/dto/create-messages.dto';
import { ChatsMessagesService } from 'src/chats/messages/messages.service';
import { SocketCatchHttpExceptionFilter } from 'src/common/exception-filter/socket-catch-http.exception-filter';
import { UsersModel } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: ChatsMessagesService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket & { user: UsersModel }) {
    console.log(`on connect called : ${socket.id}`);

    const headers = socket.handshake.headers;

    //Bearer xxxxx
    const rawToken = headers['authorization'];

    if (!rawToken) {
      socket.disconnect();
      throw new WsException('토큰이 없습니다.');
    }

    try {
      const token = this.authService.extractTokenFromHeader(rawToken, true);

      const payload = this.authService.verifyToken(token);
      const user = await this.usersService.getUserByEmail(payload.email);

      socket.user = user;

      return true;
    } catch (e) {
      socket.disconnect();
      throw new WsException('토큰이 유효하지 않습니다.');
    }
  }

  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true, // 사용하지 않는 데코레이터는 삭제하고 쿼리를 날림.
      forbidNonWhitelisted: true, // 사용하지 않는 데코레이터가 쿼리에서 필터링 되면 에러를 던짐.
    }),
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage('create_chat')
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket & { user: UsersModel },
  ) {
    const chat = await this.chatsService.createChat(data);
  }

  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true, // 사용하지 않는 데코레이터는 삭제하고 쿼리를 날림.
      forbidNonWhitelisted: true, // 사용하지 않는 데코레이터가 쿼리에서 필터링 되면 에러를 던짐.
    }),
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage('enter_chat')
  async enterChat(
    //방의 chat ID들을 리스트로 받는다.
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() socket: Socket & { user: UsersModel },
  ) {
    for (const chatId of data.chatIds) {
      const exists = await this.chatsService.checkIfChatExists(chatId);
      if (!exists) {
        throw new WsException({
          code: 100,
          message: `존재하지 않는 chat 입니다. chatId: ${chatId}`,
        });
      }
    }

    socket.join(data.chatIds.map((x) => x.toString()));
  }

  // socket.on('send_message', (message)=>{console.log(message)});
  @SubscribeMessage('send_message')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true, // 사용하지 않는 데코레이터는 삭제하고 쿼리를 날림.
      forbidNonWhitelisted: true, // 사용하지 않는 데코레이터가 쿼리에서 필터링 되면 에러를 던짐.
    }),
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  async sendMessage(
    @MessageBody() dto: CreateMessagesDto, //
    @ConnectedSocket() socket: Socket & { user: UsersModel },
  ) {
    const chatExists = await this.chatsService.checkIfChatExists(dto.chatId);

    if (!chatExists) {
      throw new WsException(
        `존재하지 않는 채팅방입니다. Chat ID : ${dto.chatId}`,
      );
    }

    const message = await this.messagesService.createMessage(
      dto,
      socket.user.id,
    );

    socket
      .to(message.chat.id.toString())
      .emit('receive_message', message.message);
    // this.server
    //   .in(message.chatId.toString())
    //   .emit('receive_message', message.message);
  }
}
