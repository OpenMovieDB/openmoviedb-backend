import { ReleaseDate, Season } from '@prisma/client';
import { IMapper } from '../../../common/interfaces/mapper.interface';
import { SeasonModel } from '../models/season.model';
import { EpisodeEntity, EpisodeMapper } from './episode.mapper';
import { ReleaseDateMapper } from 'src/domains/release-date/release-date.mapper';

export type SeasonEntity = Season & {
  episodes: EpisodeEntity[];
  releaseDate: ReleaseDate;
};

export class SeasonMapper implements IMapper<SeasonEntity, SeasonModel> {
  public mapEntityToModel(entity: SeasonEntity): SeasonModel {
    const episodes = entity.episodes ? new EpisodeMapper().mapEntitiesToModels(entity.episodes) : undefined;
    const releaseDate = entity.releaseDate ? new ReleaseDateMapper().mapEntityToModel(entity.releaseDate) : undefined;

    return {
      ...entity,
      episodes,
      releaseDate,
    };
  }

  public mapEntitiesToModels(entities: SeasonEntity[]): SeasonModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
