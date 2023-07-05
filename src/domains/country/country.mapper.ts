import { Country } from '@prisma/client';
import { IMapper } from '../../common/interfaces/mapper.interface';

import { CountryModel } from './models/country.model';
import { ImageLinkEntity, ImageLinkMapper } from '../image/mappers/image-link.mapper';
import { MovieEntity } from '../movie/movie.mapper';

type CountryEntity = Country & { images?: ImageLinkEntity[]; movies?: MovieEntity[] };

export class CountryMapper implements IMapper<CountryEntity, CountryModel> {
  public mapEntityToModel(entity: CountryEntity): CountryModel {
    const images = entity.images ? new ImageLinkMapper().mapEntitiesToModels(entity.images) : undefined;

    return {
      ...entity,
      images,
    };
  }

  public mapEntitiesToModels(entities: CountryEntity[]): CountryModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
