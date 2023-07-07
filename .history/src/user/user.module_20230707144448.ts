import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 这里需要申明，就可以使用User这个实体了
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule],// 加上这行
})
export class UserModule {}
————————————————
版权声明：本文为CSDN博主「过客猫2022」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zdhsoft/article/details/121746239
