import { Seo } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { SeoModel } from '../common/models/seo.model';

type SeoEntity = Seo;

export class SeoMapper implements IMapper<SeoEntity, SeoModel> {
  public mapEntityToModel(entity: SeoEntity): SeoModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: SeoEntity[]): SeoModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
