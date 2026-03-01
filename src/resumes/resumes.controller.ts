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

import { ResumesService } from './resumes.service';
import { CreateUserCvDto } from './dto/create-resume.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@ApiTags('Resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @ResponseMessage('Create a new resume')
  @ApiOperation({ summary: 'Nộp hồ sơ ứng tuyển' })
  create(@Body() createUserCvDto: CreateUserCvDto, @User() user: IUser) {
    return this.resumesService.create(createUserCvDto, user);
  }

  @Post('by-user')
  @ResponseMessage('Get Resumes by User')
  @ApiOperation({ summary: 'Lấy hồ sơ ứng tuyển của người dùng hiện tại' })
  getResumesByUser(@User() user: IUser) {
    return this.resumesService.findByUsers(user);
  }

  @Get()
  @ResponseMessage('Fetch all resume with pagination')
  @ApiOperation({ summary: 'Lấy tất cả hồ sơ ứng tuyển (phân trang)' })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.resumesService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage('Fetch a resume by id')
  @ApiOperation({ summary: 'Lấy hồ sơ ứng tuyển theo ID' })
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update status resume')
  @ApiOperation({ summary: 'Cập nhật trạng thái hồ sơ ứng tuyển' })
  update(
    @Param('id') id: string,
    @Body('status') status: string,
    @User() user: IUser,
  ) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a resume by id')
  @ApiOperation({ summary: 'Xóa hồ sơ ứng tuyển' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }
}
