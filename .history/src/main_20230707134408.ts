// main.ts
import './log/log4js';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getLogger } from 'xmcommon';
import { NestLogger } from './nest.logger';
const log = getLogger(__filename);  // 这样构造日志，就可以在输出的地方，打印出对应的文件
log.info('程序开始启动...');
async function bootstrap() {
    const app = await NestFactory.create(AppModule,
    {
        logger: new NestLogger() // 这里指定了新的nest日志
    });
    await app.listen(3000);
    log.info('开始侦听:3000...')
}
bootstrap();
