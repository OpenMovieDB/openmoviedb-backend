import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { S3ProviderModule } from './s3.module';

@Module({
  imports: [S3ProviderModule],
  providers: [FileService],
})
export class FileModule {}
