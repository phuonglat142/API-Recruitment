import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseFilters,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';

import { FilesService } from './files.service';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Post('upload')
  @ResponseMessage('Upload Single File')
  @ApiOperation({ summary: 'Tải lên file (CV, hình ảnh, ...)' })
  @UseInterceptors(FileInterceptor('fileUpload'))
  @UseFilters(new HttpExceptionFilter())
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      fileName: file.filename,
    };
  }
}
