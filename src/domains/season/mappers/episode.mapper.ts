import { Episode } from '@prisma/client';

import { EpisodeModel } from '../models/episode.model';
import { ImageLinkEntity, ImageLinkMapper } from '../../image/mappers/image-link.mapper';
import { IMapper } from '../../../common/interfaces/mapper.interface';

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
