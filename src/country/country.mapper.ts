import { Country } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { CountryModel } from './models/country.model';

type CountryEntity = Country;

export class CountryMapper implements IMapper<CountryEntity, CountryModel> {
  public mapEntityToModel(entity: CountryEntity): CountryModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: CountryEntity[]): CountryModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
