import { Episode } from '@prisma/client';

import { EpisodeModel } from '../models/episode.model';
import { IMapper } from 'src/common/interfaces/mapper.interface';
import { ImageLinkEntity, ImageLinkMapper } from 'src/image/mappers/image-link.mapper';

export type EpisodeEntity = Episode & {
  image: ImageLinkEntity;
};

export class EpisodeMapper implements IMapper<EpisodeEntity, EpisodeModel> {
  public mapEntityToModel(entity: EpisodeEntity): EpisodeModel {
    const image = entity.image ? new ImageLinkMapper().mapEntityToModel(entity.image) : undefined;
    return {
      ...entity,
      image,
    };
  }

  public mapEntitiesToModels(entities: EpisodeEntity[]): EpisodeModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
