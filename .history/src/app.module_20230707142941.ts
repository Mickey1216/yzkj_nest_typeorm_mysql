import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload/upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "LL586402",
    "database": "nest_typeorm_mysql",
    "synchronize": false,
    "entities": ["dist/**/*.entity{ .ts,.js}"]  // 按照这里的配置，所有entity的对象可以自动注入，不需导入到任何模块了
  })],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule { }
