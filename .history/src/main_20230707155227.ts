import './log/log4js';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getLogger } from 'xmcommon';
import { NestLogger } from './nest.logger';
import { RequestInterceptor } from './request.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const log = getLogger(__filename);
log.info('程序开始启动...');
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new NestLogger(),
    });

    app.useGlobalInterceptors(new RequestInterceptor());

    const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
————————————————
版权声明：本文为CSDN博主「过客猫2022」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zdhsoft/article/details/126318068

    await app.listen(3000);
    log.info('开始侦听:3000...');
}
bootstrap();
