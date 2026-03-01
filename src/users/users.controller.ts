import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Create a new user')
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    let newUser = await this.usersService.create(createUserDto, user);

    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
  }

  @Get()
  @ResponseMessage('Fetch user with pagination')
  @ApiOperation({ summary: 'Lấy danh sách người dùng (phân trang)' })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @ResponseMessage('Fetch user by id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let foundUser = await this.usersService.findOne(id);
    return foundUser;
  }

  @Patch()
  @ResponseMessage('Update a user')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    let updatedUser = await this.usersService.update(updateUserDto, user);
    return updatedUser;
  }

  @Delete(':id')
  @ResponseMessage('Delete a user')
  @ApiOperation({ summary: 'Xóa người dùng' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
