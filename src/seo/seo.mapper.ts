import { Seo } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { SeoModel } from './models/seo.model';
import { SeoType } from './models/seo-type.enum';

export type SeoEntity = Seo;

export class SeoMapper implements IMapper<SeoEntity, SeoModel> {
  public mapEntityToModel(entity: SeoEntity): SeoModel {
    return {
      ...entity,
      type: SeoType[entity.type],
    };
  }

  public mapEntitiesToModels(entities: SeoEntity[]): SeoModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
