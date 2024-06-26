import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CommonModule } from 'src/common/common.module';
import { CommonService } from 'src/common/common.service';
import { ImageModel } from 'src/common/entity/image.entity';
import { PostsModel } from 'src/posts/entity/posts.entity';
import { PostsImagesService } from 'src/posts/image/images.service';
import { UserFollowersModel } from 'src/users/entity/user-followers.entity';
import { UsersModel } from 'src/users/entity/users.entity';
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
      ImageModel,
      UserFollowersModel,
    ]),
    CommonModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService, //
    PostsImagesService,
    AuthService,
    UsersService,
    CommonService,
  ], //@Injectable을 위한 프로바이더 -> 주입
  exports: [PostsService],
})
export class PostsModule {}
