import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { XCommonRet } from 'xmcommon';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('应用系列接口')
@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get('all')
   @HttpCode(200)
   async all() {
       const r = new XCommonRet();
       r.setData(await this.userService.findAll());
       return r;
   }

//    @Post('user')
//    async getUser(@Body() param: { id: number }) {
//        const r = new XCommonRet();
//        r.setData(await this.userService.findOne(param.id));
//        return r;
//    }

   
}

