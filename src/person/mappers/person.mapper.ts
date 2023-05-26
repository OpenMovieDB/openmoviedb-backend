import { ExternalID, Person } from '@prisma/client';
import { IMapper } from '../../common/interfaces/mapper.interface';
import { ImageLinkEntity, ImageLinkMapper } from '../../image/mappers/image-link.mapper';
import { PersonModel } from '../models/person.model';
import { ExternalIDMapper } from '../../external-id/external-id.mapper';

export type PersonEntity = Person & { images: ImageLinkEntity[]; externalIDs: ExternalID[] };

export class PersonMapper implements IMapper<PersonEntity, PersonModel> {
  public mapEntityToModel(entity: PersonEntity): PersonModel {
    return {
      ...entity,
      images: new ImageLinkMapper().mapEntitiesToModels(entity.images),
      externalID: new ExternalIDMapper().mapEntitiesToModels(entity.externalIDs),
    };
  }

  public mapEntitiesToModels(entities: PersonEntity[]): PersonModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
