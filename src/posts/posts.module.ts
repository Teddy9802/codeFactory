import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CommonModule } from 'src/common/common.module';
import { CommonService } from 'src/common/common.service';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { UsersModel } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  //forFeature는 레포지토리를 주입할때 사용
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      PostsModel, //
      UsersModel,
      CommonModule,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, AuthService, UsersService, CommonService], //@Injectable을 위한 프로바이더 -> 주입
})
export class PostsModule {}
