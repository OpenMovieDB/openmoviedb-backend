import { MediaAsset } from '@prisma/client';
import { IMapper } from '../../common/interfaces/mapper.interface';
import { MediaAssetModel, MediaFormat } from '../models/media-asset.model';

type MediaAssetEntity = MediaAsset;

export class MediaAssetMapper implements IMapper<MediaAssetEntity, MediaAssetModel> {
  public mapEntityToModel(entity: MediaAssetEntity): MediaAssetModel {
    return {
      ...entity,
      format: MediaFormat[entity.format],
    };
  }

  public mapEntitiesToModels(entities: MediaAssetEntity[]): MediaAssetModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
