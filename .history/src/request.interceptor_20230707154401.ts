
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { getLogger, XCommonRet } from 'xmcommon';
import { IHttpRet, RetUtils } from './ret_utils';
import { Response, Request } from 'express';
// import { urlPrefix } from './constant';
// import { XVankeRet } from './vanke_constants';

/*
 xmcommon是我这里提供的一个开源库，提供了一些常用工具类函数，已经全部使用typescript全部重写了。目前已经在我的很多个项目中使用了
 项目地址：https://github.com/zdhsoft/xmcommon
 使用npm i xmcommon就可以安装了
 
 这个代码中，使用了xmcommon的getLogger对象和XCommonRet<T>对像
 - getLogger 请查看笔记 nest笔记二：使用log4js替换nest默认日志：https://zdhsoft.blog.csdn.net/article/details/121359315
 - XCommonRet<T> 则是一个函数对象的统一返回对象
 */
const log = getLogger(__filename);
/** 每次请求的记数器 */
let requestSeq = 0;

const check_list=['/api/','/test/'];

/**
 * 全局拦截器类
 */
@Injectable()
export class RequestInterceptor implements NestInterceptor {
    /**
     * 拦截器入口
     * @param context 上下文对象
     * @param next 后续调用函数
     * @returns
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        /** 请求开始时间 */
        const start = Date.now();
        /** 当前环境 */
        const host = context.switchToHttp();
        /** 请求对象 */
        const req = host.getRequest<Request>();
        /** 响应对象 */
        const res = host.getResponse<Response>();
        /** 当前计数 */
        const seq = requestSeq++;
        /** 当前URL */
        const url = req.url; // req.path;
        /** 当前URL */
        const urlInfo = `${req.method} ${url}`;

        log.info(`[${seq}]==> ${urlInfo}`);
        req['seq'] = seq;
        let isCheckAPI = false;
        for(let pre of check_list) {
            if (url.startWith(pre)) {
                isCheckAPI = true;
                break;
            }
        }

        if (isCheckAPI) {
            return next
                .handle()
                .pipe(
                    map((data) => {
                        /* 这里拦截POST返回的statusCode，它默认返回是201, 这里改为200 */
                        if (res.statusCode === HttpStatus.CREATED && req.method === 'POST') {
                            res.statusCode = HttpStatus.OK;
                        }
                        // 这里要求所有的请求返回，都是XCommonRet
                        if (data instanceof XCommonRet) {
                            return RetUtils.byCommonRet(data);
                        } else if (data === undefined) {
                            log.error('--------- data is undefine!');
                            return data;
                        } else {
                            const r: IHttpRet = {
                                ret: -1,
                                msg: '这个请求返回的不是XCommonRet对象!',
                                url: req.originalUrl,
                            };
                            log.error('返回错误:' + JSON.stringify(r));
                            return data;
                        }
                    }),
                )
                .pipe(
                    // 这里打印请求处理完成的信息
                    tap(() => log.info(`[${seq}]<== ${urlInfo} ${Date.now() - start} ms`)),
                );
        }  else {
            return next.handle().pipe(
                // 这里打印请求处理完成的信息
                tap(() => log.info(`[${seq}]<== ${urlInfo} ${Date.now() - start} ms`)),
            );
        }
    }
}