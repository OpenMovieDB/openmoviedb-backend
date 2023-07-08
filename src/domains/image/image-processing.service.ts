import { Injectable, Logger } from '@nestjs/common';
import * as sharp from 'sharp';
import sizeOf from 'image-size';
import { ImageAssetFormat, ImageAssetWidth } from './models/image-asset.model';
import { PrismaService } from 'nestjs-prisma';
import { FileService } from '../file/file.service';

@Injectable()
export class ImageProcessingService {
  private readonly logger = new Logger(ImageProcessingService.name);
  constructor(
    private readonly fileService: FileService,
    private readonly prismaService: PrismaService,
  ) {}

  async processAndUploadImageAsset(
    buffer: Buffer,
    imageId: string,
    size: { width: ImageAssetWidth; aspectRatio: number },
    format: ImageAssetFormat,
  ): Promise<any> {
    this.logger.debug(`Processing image asset ${imageId} with size ${size.width} and format ${format}`);
    const processedImageBuffer = await this.processImage(buffer, size, format);
    this.logger.debug(`Image asset ${imageId} processed`);
    const data = await this.createAndUploadAsset(processedImageBuffer, imageId, size, format);
    this.logger.debug(`Image asset ${imageId} uploaded`);
    return data;
  }

  getOptimalSizes(file: Buffer): { width: ImageAssetWidth; aspectRatio: number }[] {
    const originalSize = sizeOf(file);
    const aspectRatio = originalSize.width / originalSize.height;

    return Object.values(ImageAssetWidth).map((width) => ({ width, aspectRatio }));
  }

  private async processImage(
    buffer: Buffer,
    size: { width: ImageAssetWidth; aspectRatio: number },
    format: ImageAssetFormat,
  ): Promise<Buffer> {
    const processedImage = sharp(buffer)
      .toFormat(format.toLowerCase() as keyof sharp.FormatEnum)
      .resize(size.width !== ImageAssetWidth.ORIGINAL ? parseInt(size.width.replace('W', ''), 10) : undefined);

    switch (format) {
      case ImageAssetFormat.JPEG:
        processedImage.jpeg({ quality: 80 });
        break;
      case ImageAssetFormat.PNG:
        processedImage.png({ compressionLevel: 9 });
        break;
      case ImageAssetFormat.WEBP:
        processedImage.webp({ quality: 80 });
        break;
    }

    return processedImage.toBuffer();
  }

  private async createAndUploadAsset(
    file: Buffer,
    imageId: string,
    size: { width: ImageAssetWidth; aspectRatio: number },
    format: ImageAssetFormat,
  ): Promise<any> {
    this.logger.debug(`Uploading image asset ${imageId} with size ${size.width} and format ${format}`);
    const createdAsset = await this.prismaService.imageAsset.create({
      data: {
        format: format,
        width: size.width,
        url: '',
        image: {
          connect: { id: imageId },
        },
      },
    });

    const outputPath = `${imageId}/${createdAsset.id}_${size.width}.${format.toLowerCase()}`;
    const contentType = this.getContentType(format);
    this.logger.debug(`Uploading image asset ${imageId} with size ${size.width} and format ${format} to ${outputPath}`);
    const fileUploaded = await this.fileService.upload(outputPath, file, contentType);
    this.logger.debug(`Image asset ${imageId} with size ${size.width} and format ${format} uploaded to ${outputPath}`);
    if (fileUploaded) {
      await this.updateAssetUrl(createdAsset.id, outputPath);
    }

    return createdAsset;
  }

  private getContentType(format: ImageAssetFormat): string {
    switch (format) {
      case ImageAssetFormat.JPEG:
        return 'image/jpeg';
      case ImageAssetFormat.PNG:
        return 'image/png';
      case ImageAssetFormat.WEBP:
        return 'image/webp';
      default:
        return 'application/octet-stream';
    }
  }

  private async updateAssetUrl(assetId: string, outputPath: string) {
    return this.prismaService.imageAsset.update({
      where: { id: assetId },
      data: { url: `${this.fileService.s3Url}/${outputPath}` },
    });
  }

  async downloadImage(url: string): Promise<Buffer> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Unexpected response: ${response.statusText}`);
    }

    const data = await response.arrayBuffer();

    return Buffer.from(data);
  }
}
