import { Injectable, Logger } from '@nestjs/common';
import { S3Service, S3ModuleUploadedFile } from '@appotter/nestjs-S3';
import { ConfigService } from '@nestjs/config';
import { Types } from 'aws-sdk/clients/s3';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  public readonly s3Url =
    this.configService.get<string>('S3_ENDPOINT') + '/' + this.configService.get<string>('S3_BUCKET');

  constructor(private readonly s3Service: S3Service, private readonly configService: ConfigService) {}

  async upload(filePath: string, file: Buffer, contentType: string): Promise<boolean> {
    const bucket = this.configService.get<string>('S3_BUCKET');

    const objectParams: Types.PutObjectRequest = {
      Bucket: bucket,
      Key: filePath,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };

    try {
      await this.s3Service.getClient().upload(objectParams).promise();
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async deleteFile(filePath: string): Promise<boolean> {
    const { status } = await this.s3Service.delete(filePath);

    return status;
  }
}
