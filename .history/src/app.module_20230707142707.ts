import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload/upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ T],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
