import { Image, Seo } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { SeoModel, SeoType } from './seo.model';
import { ImageLinkEntity, ImageLinkMapper } from 'src/image/mappers/image-link.mapper';

export type SeoEntity = Seo & {
  image: ImageLinkEntity;
};

export class SeoMapper implements IMapper<SeoEntity, SeoModel> {
  public mapEntityToModel(entity: SeoEntity): SeoModel {
    const image = entity.image ? new ImageLinkMapper().mapEntityToModel(entity.image) : undefined;

    return {
      ...entity,
      image,
      type: SeoType[entity.type],
    };
  }

  public mapEntitiesToModels(entities: SeoEntity[]): SeoModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
