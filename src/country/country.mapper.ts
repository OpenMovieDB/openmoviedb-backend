import { Country } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { ImageLinkEntity, ImageLinkMapper } from 'src/image/mappers/image-link.mapper';
import { MovieEntity, MovieMapper } from 'src/movie/movie.mapper';
import { CountryModel } from './models/country.model';

type CountryEntity = Country & { images?: ImageLinkEntity[]; movies?: MovieEntity[] };

export class CountryMapper implements IMapper<CountryEntity, CountryModel> {
  public mapEntityToModel(entity: CountryEntity): CountryModel {
    const images = entity.images ? new ImageLinkMapper().mapEntitiesToModels(entity.images) : undefined;
    const movies = entity.movies ? new MovieMapper().mapEntitiesToModels(entity.movies) : undefined;
    return {
      ...entity,
      images,
      movies,
    };
  }

  public mapEntitiesToModels(entities: CountryEntity[]): CountryModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
