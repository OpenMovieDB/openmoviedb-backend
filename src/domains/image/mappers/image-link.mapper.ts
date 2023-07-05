import { Image, ImageAsset, ImageLink } from '@prisma/client';

import { ImageMapper } from './image.mapper';
import { IMapper } from '../../../common/interfaces/mapper.interface';
import { ImageLinkModel, ImageType } from '../models/image-link.model';

export type ImageLinkEntity = ImageLink & {
  image: Image & {
    assets: ImageAsset[];
  };
};

export class ImageLinkMapper implements IMapper<ImageLinkEntity, ImageLinkModel> {
  public mapEntityToModel(entity: ImageLinkEntity): ImageLinkModel {
    return {
      ...entity,
      type: ImageType[entity.type],
      image: new ImageMapper().mapEntityToModel(entity.image),
    };
  }

  public mapEntitiesToModels(entities: ImageLinkEntity[]): ImageLinkModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
