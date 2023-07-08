import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ImageMapper } from './mappers/image.mapper';
import { ImageModel } from './models/image.model';
import { ImageLinkModel } from './models/image-link.model';
import { ImageLinkMapper } from './mappers/image-link.mapper';
import { ImageAssetFormat } from './models/image-asset.model';
import { ImageProcessingService } from './image-processing.service';
import { Image, ImageAsset } from '@prisma/client';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);
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

  async uploadImages(images: Buffer[]): Promise<string[]> {
    return await Promise.all(images.map(this.uploadImage.bind(this)));
  }

  async uploadImageByURL(url: string): Promise<string> {
    this.logger.debug(`Downloading image from ${url}`);
    const image = await this.imageProcessingService.downloadImage(url);
    this.logger.debug(`Image downloaded from ${url}`);
    return this.uploadImage(image);
  }

  private async uploadImage(image: Buffer): Promise<string> {
    this.logger.debug(`Uploading image`);
    const createdImage = await this.createImage(image);
    this.logger.debug(`Image created with id ${createdImage.id}`);

    const assets = await this.getProcessingTasks(image, createdImage);
    this.logger.debug(`Image assets created`);

    this.logger.debug(`Updating image assets`);
    await this.updateImageAssets(createdImage, assets);

    this.logger.debug(`Image assets updated`);
    return createdImage.id;
  }

  private async createImage(image: Buffer) {
    const size = this.imageProcessingService.getOptimalSizes(image)[0];
    const width = parseInt(size.width.replace('W', ''), 10);
    const height = Math.round(width / size.aspectRatio);
    return this.prismaService.image.create({
      data: {
        width: width,
        height: height,
      },
    });
  }

  private async getProcessingTasks(image: Buffer, createdImage: any): Promise<Array<any>> {
    const formats = this.getImageFormats();
    const sizes = this.imageProcessingService.getOptimalSizes(image);
    this.logger.debug(`Image will be processed in ${formats.length} formats and ${sizes.length} sizes`);
    const tasks = await Promise.all(
      formats.flatMap((format) =>
        sizes.map((size) =>
          this.imageProcessingService.processAndUploadImageAsset(image, createdImage.id, size, format),
        ),
      ),
    );
    this.logger.debug(`Image processing tasks created for ${tasks.length} assets`);
    return tasks;
  }

  private async updateImageAssets(createdImage: Image, assets: ImageAsset[]) {
    return this.prismaService.image.update({
      where: { id: createdImage.id },
      data: { assets: { connect: assets.map(({ id }) => ({ id })) } },
    });
  }

  private getImageFormats(): ImageAssetFormat[] {
    return [ImageAssetFormat.WEBP];
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

  async findManyByIds(ids: string[]): Promise<ImageLinkModel[]> {
    const images = await this.prismaService.imageLink.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      ...this.defaultInclude,
    });
    return new ImageLinkMapper().mapEntitiesToModels(images);
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

  async findManyByCollectionIds(ids: string[]): Promise<ImageLinkModel[]> {
    const images = await this.prismaService.imageLink.findMany({
      where: {
        collectionId: {
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
