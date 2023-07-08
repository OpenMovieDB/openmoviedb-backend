import { Injectable, Logger } from '@nestjs/common';
import { S3Service } from '@appotter/nestjs-s3';
import { ConfigService } from '@nestjs/config';
import { Types } from 'aws-sdk/clients/s3';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  public readonly s3Url = this.configService.get<string>('S3_URL');

  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  async upload(filePath: string, file: Buffer, contentType: string): Promise<boolean> {
    this.logger.debug(`Uploading file ${filePath} to S3`);
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
      this.logger.debug(`File ${filePath} uploaded to S3`);
      return true;
    } catch (error) {
      this.logger.error(`Error uploading file ${filePath} to S3: ${error}`);
      return false;
    }
  }

  async deleteFile(filePath: string): Promise<boolean> {
    const { status } = await this.s3Service.delete(filePath);

    return status;
  }
}
