import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ImageMapper } from './mappers/image.mapper';
import { ImageModel } from './models/image.model';
import { ImageLinkModel } from './models/image-link.model';
import { ImageLinkMapper } from './mappers/image-link.mapper';
import { ImageAssetFormat, ImageAssetWidth } from './models/image-asset.model';
import { ImageProcessingService } from './image-processing.service';
import { Image, ImageAsset } from '@prisma/client';
@Injectable()
export class ImageService {
  private readonly defaultInclude = {
    include: {
      image: {
        include: {
          assets: true,
        },
      },
    },
  };

  constructor(
    private readonly prismaService: PrismaService,
    private readonly imageProcessingService: ImageProcessingService,
  ) {}

  async uploadImages(images: Express.Multer.File[]): Promise<string[]> {
    return await Promise.all(images.map(this.uploadImage.bind(this)));
  }

  private async uploadImage(image: Express.Multer.File): Promise<string> {
    const createdImage = await this.createImage(image);
    const tasks = this.getProcessingTasks(image, createdImage);
    const assets = await Promise.all(tasks);

    await this.updateImageAssets(createdImage, assets);
    return createdImage.id;
  }

  private async createImage(image: Express.Multer.File) {
    const size = this.imageProcessingService.getOptimalSizes(image.buffer)[0];
    const width = parseInt(size.width.replace('W', ''), 10);
    const height = Math.round(width / size.aspectRatio);
    return this.prismaService.image.create({
      data: {
        width: width,
        height: height,
      },
    });
  }

  private getProcessingTasks(image: Express.Multer.File, createdImage: any): Array<Promise<any>> {
    const formats = this.getImageFormats();
    const sizes = this.imageProcessingService.getOptimalSizes(image.buffer);

    return formats.flatMap((format) =>
      sizes.map((size) =>
        this.imageProcessingService.processAndUploadImageAsset(image.buffer, createdImage.id, size, format),
      ),
    );
  }

  private async updateImageAssets(createdImage: Image, assets: ImageAsset[]) {
    return this.prismaService.image.update({
      where: { id: createdImage.id },
      data: { assets: { connect: assets.map(({ id }) => ({ id })) } },
    });
  }

  private getImageFormats(): ImageAssetFormat[] {
    return [ImageAssetFormat.AVIF, ImageAssetFormat.WEBP];
  }

  async findOne(id: string): Promise<ImageModel> {
    const image = await this.prismaService.image.findUnique({
      where: {
        id: id,
      },
      include: {
        assets: true,
        link: true,
      },
    });
    return new ImageMapper().mapEntityToModel(image);
  }

  async findManyByMovieIds(ids: string[]): Promise<ImageLinkModel[]> {
    const images = await this.prismaService.imageLink.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
      ...this.defaultInclude,
    });

    return new ImageLinkMapper().mapEntitiesToModels(images);
  }

  async findManyByGenreIds(ids: string[]): Promise<ImageLinkModel[]> {
    const images = await this.prismaService.imageLink.findMany({
      where: {
        genreId: {
          in: ids,
        },
      },
      ...this.defaultInclude,
    });

    return new ImageLinkMapper().mapEntitiesToModels(images);
  }

  async findManyByCountryIds(ids: string[]): Promise<ImageLinkModel[]> {
    const images = await this.prismaService.imageLink.findMany({
      where: {
        countryId: {
          in: ids,
        },
      },
      ...this.defaultInclude,
    });

    return new ImageLinkMapper().mapEntitiesToModels(images);
  }

  async findManyByBlockIds(ids: string[]): Promise<ImageLinkModel[]> {
    const images = await this.prismaService.imageLink.findMany({
      where: {
        blockId: {
          in: ids,
        },
      },
      ...this.defaultInclude,
    });

    return new ImageLinkMapper().mapEntitiesToModels(images);
  }

  async findManyImages(): Promise<ImageModel[]> {
    const images = await this.prismaService.image.findMany({
      include: {
        assets: true,
      },
    });
    return images.map((image) => new ImageMapper().mapEntityToModel(image));
  }
}
