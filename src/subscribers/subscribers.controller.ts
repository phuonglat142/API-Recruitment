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
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import {
  ResponseMessage,
  SkipCheckPermission,
  User,
} from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@ApiTags('Subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  @ResponseMessage('Create a subscriber')
  @ApiOperation({ summary: 'Đăng ký nhận thông báo việc làm' })
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @User() user: IUser,
  ) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Post('skills')
  @ResponseMessage("Get subscriber's skills")
  @SkipCheckPermission()
  @ApiOperation({ summary: 'Lấy danh sách kỹ năng đã đăng ký của người dùng' })
  getUserSkills(@User() user: IUser) {
    return this.subscribersService.getSkills(user);
  }

  @Get()
  @ResponseMessage('Fetch subscribers with pagination')
  @ApiOperation({ summary: 'Lấy danh sách người đăng ký (phân trang)' })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.subscribersService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage('Fetch subscribers by id')
  @ApiOperation({ summary: 'Lấy thông tin người đăng ký theo ID' })
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
  @SkipCheckPermission()
  @ResponseMessage('Update a subscribers')
  @ApiOperation({ summary: 'Cập nhật thông tin đăng ký nhận thông báo' })
  update(
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser,
  ) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a subscribers')
  @ApiOperation({ summary: 'Xóa đăng ký nhận thông báo' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.subscribersService.remove(id, user);
  }
}
