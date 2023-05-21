import { Media } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { MediaModel } from '../common/models/media.movie';

type MediaEntity = Media;

export class MediaMapper implements IMapper<MediaEntity, MediaModel> {
  public mapEntityToModel(entity: MediaEntity): MediaModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: MediaEntity[]): MediaModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
