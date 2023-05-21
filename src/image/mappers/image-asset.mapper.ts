import { ImageAsset } from '@prisma/client';
import { ImageAssetFormat, ImageAssetModel, ImageAssetWidth } from '../../common/models/image-asset.model';
import { IMapper } from '../../common/interfaces/mapper.interface';

type ImageAssetEntity = ImageAsset;

export class ImageAssetMapper implements IMapper<ImageAssetEntity, ImageAssetModel> {
  public mapEntityToModel(entity: ImageAssetEntity): ImageAssetModel {
    return {
      ...entity,
      format: ImageAssetFormat[entity.format],
      width: ImageAssetWidth[entity.width],
    };
  }

  public mapEntitiesToModels(entities: ImageAssetEntity[]): ImageAssetModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
