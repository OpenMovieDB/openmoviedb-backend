import { Image, ImageAsset } from '@prisma/client';
import { IMapper } from '../../common/interfaces/mapper.interface';
import { ImageModel } from '../models/image.model';
import { ImageAssetMapper } from './image-asset.mapper';

export type ImageEntity = Image & { assets: ImageAsset[] };

export class ImageMapper implements IMapper<ImageEntity, ImageModel> {
  public mapEntityToModel(entity: ImageEntity): ImageModel {
    return {
      ...entity,
      assets: entity.assets.map((asset) => new ImageAssetMapper().mapEntityToModel(asset)),
    };
  }

  public mapEntitiesToModels(entities: ImageEntity[]): ImageModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
