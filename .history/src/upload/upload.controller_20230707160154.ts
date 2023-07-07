/**
 * 文件的上传与下载
 */
import {
    Body,
    Controller,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { XCommonRet } from 'xmcommon';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user系列接口')
@Controller('upload')
export class UploadController {
    @Post('up')
    @UseInterceptors(FileInterceptor('file'))
    public up(@UploadedFile() file: Express.Multer.File, @Body() body) {
        const r = new XCommonRet<number>();

        do {
            console.log('file', file);
            console.log('body', body);
        } while (false);

        return r;
    }

    @Post('download')
    public download(@Res() res: Response) {
        const filePath = 'c:\\temp\\测试.zip';

        res.download(filePath, err => {
            if (!err) {
                console.log('success', 'download', filePath);
                return;
            }

            console.error(err);
            res.send({ err: -1, msg: String(err) });
        });
    }

    @Post('view')
    public view(@Res() res: Response) {
        const filePath = 'c:\\temp\\测试.jpg';

        res.sendFile(filePath, err => {
            if (!err) {
                console.log('success', 'view', filePath);
                return;
            }
            console.error(err);
            res.send({ err: -1, msg: String(err) });
        });
    }
}

