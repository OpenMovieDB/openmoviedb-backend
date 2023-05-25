import { Genre, ImageLink } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { GenreModel } from './models/genre.model';
import { ImageLinkEntity, ImageLinkMapper } from 'src/image/mappers/image-link.mapper';
import { MovieEntity, MovieMapper } from 'src/movie/movie.mapper';

type GenreEntity = Genre & { images?: ImageLinkEntity[]; movies?: MovieEntity[] };

export class GenreMapper implements IMapper<GenreEntity, GenreModel> {
  public mapEntityToModel(entity: GenreEntity): GenreModel {
    const images = entity.images ? new ImageLinkMapper().mapEntitiesToModels(entity.images) : undefined;
    const movies = entity.movies ? new MovieMapper().mapEntitiesToModels(entity.movies) : undefined;
    return {
      ...entity,
      images,
      movies,
    };
  }

  public mapEntitiesToModels(entities: GenreEntity[]): GenreModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
