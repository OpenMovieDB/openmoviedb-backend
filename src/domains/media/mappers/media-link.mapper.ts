import { Image, ImageAsset, ImageLink, Media, MediaAsset, MediaLink } from '@prisma/client';
import { IMapper } from '../../../common/interfaces/mapper.interface';
import { MediaLinkModel, MediaType } from 'src/domains/media/models/media-link.model';
import { MediaMapper } from './media.mapper';

type MediaEntity = MediaLink & {
  media: Media & { assets: MediaAsset[]; image: ImageLink & { image: Image & { assets: ImageAsset[] } } };
};

export class MediaLinkMapper implements IMapper<MediaEntity, MediaLinkModel> {
  public mapEntityToModel(entity: MediaEntity): MediaLinkModel {
    return {
      ...entity,
      type: MediaType[entity.type],
      media: new MediaMapper().mapEntityToModel(entity.media),
    };
  }

  public mapEntitiesToModels(entities: MediaEntity[]): MediaLinkModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
