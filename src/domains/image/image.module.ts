import { Module } from '@nestjs/common';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ImageProcessingService } from './image-processing.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  providers: [ImageResolver, ImageService, ImageProcessingService],
  exports: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
