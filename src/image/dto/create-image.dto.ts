import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ImageType } from '../models/image-link.model';

export class CreateImageDto {
  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  images: Express.Multer.File[];
}
