import { Injectable, Logger } from '@nestjs/common';
import { S3Service, S3ModuleUploadedFile } from '@appotter/nestjs-S3';
import { PutObjectRequest } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  constructor(private readonly s3Service: S3Service, private readonly configService: ConfigService) {}

  async upload(fileKey: string, file: S3ModuleUploadedFile): Promise<boolean> {
    const bucket = this.configService.get('S3_BUCKET');

    const objectParams: PutObjectRequest = {
      Bucket: bucket,
      Key: fileKey,
      Body: file.buffer,
      ACL: 'public-read',
    };

    try {
      await this.s3Service.getClient().upload(objectParams).promise();
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async deleteFile(fileKey: string): Promise<boolean> {
    const { status } = await this.s3Service.delete(fileKey);

    return status;
  }
}
