import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  Res,
  Get,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private roleService: RolesService,
  ) {}

  @Public()
  @ResponseMessage('Register a new user')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('User Login')
  @ApiOperation({ summary: 'Đăng nhập' })
  @Post('/login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @ResponseMessage('Get user infomation')
  @ApiOperation({ summary: 'Lấy thông tin tài khoản hiện tại' })
  @Get('/account')
  async handleGetAccount(@User() user: IUser) {
    const temp = (await this.roleService.findOne(user.role._id)) as any;
    user.permissions = temp.permissions;
    return { user };
  }

  @Public()
  @ResponseMessage('Get User by refresh token')
  @ApiOperation({ summary: 'Refresh token' })
  @Get('/refresh')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
  }

  @ResponseMessage('Logout User')
  @ApiOperation({ summary: 'Đăng xuất' })
  @Post('/logout')
  handleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ) {
    return this.authService.logout(response, user);
  }
}
