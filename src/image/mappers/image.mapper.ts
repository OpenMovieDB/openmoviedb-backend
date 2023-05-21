import { Image, ImageAsset, ImageLink } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { ImageModel, ImageType } from '../common/models/image.model';

type ImageEntity = Image & { assets: ImageAsset[]; link: ImageLink };

export class ImageMapper implements IMapper<ImageEntity, ImageModel> {
  public mapEntityToModel(entity: ImageEntity): ImageModel {
    return {
      ...entity,
      assets: entity.assets.map((asset) => ({
        ...asset,
      })),}
      type: ImageType[entity.link.type] as ImageType,
    };
  }

  public mapEntitiesToModels(entities: ImageEntity[]): ImageModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
