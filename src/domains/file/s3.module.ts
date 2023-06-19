import { S3Module, S3Service } from '@appotter/nestjs-s3';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    S3Module.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        endpoint: configService.get('S3_ENDPOINT'),
        accessKeyId: configService.get('S3_ACCESS_KEY'),
        secretAccessKey: configService.get('S3_SECRET_KEY'),
        region: configService.get('S3_REGION'),
        bucket: configService.get('S3_BUCKET'),
      }),
    }),
  ],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3ProviderModule {}
