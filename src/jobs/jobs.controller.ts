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

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ResponseMessage('Create a new job')
  @ApiOperation({ summary: 'Tạo việc làm mới' })
  async create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    let newJob = await this.jobsService.create(createJobDto, user);

    return newJob;
  }

  @Get()
  @Public()
  @ResponseMessage('Fetch jobs with pagination')
  @ApiOperation({ summary: 'Lấy danh sách việc làm (phân trang)' })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Fetch a job by id')
  @ApiOperation({ summary: 'Lấy thông tin việc làm theo ID' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update a job')
  @ApiOperation({ summary: 'Cập nhật thông tin việc làm' })
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a job')
  @ApiOperation({ summary: 'Xóa việc làm' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
