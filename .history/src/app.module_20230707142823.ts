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
    "entities": ["entities/*.js"]
  })],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule { }