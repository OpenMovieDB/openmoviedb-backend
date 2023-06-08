import { Module } from '@nestjs/common';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { FileModule } from 'src/file/file.module';
import { ImageProcessingService } from './image-processing.service';

@Module({
  imports: [FileModule],
  providers: [ImageResolver, ImageService, ImageProcessingService],
  exports: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
