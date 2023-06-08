import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateImageDto } from './dto/create-image.dto';
import { CreateImageResponse } from 'aws-sdk/clients/sagemaker';
import { CreateImageResponseDto } from './dto/create-image.response.dto';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: 'Upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateImageDto,
  })
  @UseInterceptors(FilesInterceptor('images'))
  @Post()
  async uploadImages(
    @Body() dto: CreateImageDto,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<CreateImageResponseDto> {
    const ids = await this.imageService.uploadImages(images);
    return {
      ids,
    };
  }
}
