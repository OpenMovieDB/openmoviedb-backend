import { Media, MediaAsset } from '@prisma/client';
import { IMapper } from '../../common/interfaces/mapper.interface';
import { MediaModel, MediaSource } from '../models/media.model';
import { ImageLinkEntity, ImageLinkMapper } from 'src/image/mappers/image-link.mapper';
import { MediaAssetMapper } from './media-asset.mapper';

type MediaEntity = Media & {
  assets: MediaAsset[];
  image: ImageLinkEntity;
};

export class MediaMapper implements IMapper<MediaEntity, MediaModel> {
  public mapEntityToModel(entity: MediaEntity): MediaModel {
    return {
      ...entity,
      source: MediaSource[entity.source],
      assets: new MediaAssetMapper().mapEntitiesToModels(entity.assets),
      image: new ImageLinkMapper().mapEntityToModel(entity.image),
    };
  }

  public mapEntitiesToModels(entities: MediaEntity[]): MediaModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
