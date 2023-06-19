import { Image, ImageAsset, ImageLink } from '@prisma/client';
import { IMapper } from 'src/common/interfaces/mapper.interface';
import { ImageLinkModel, ImageType } from 'src/domains/image/models/image-link.model';
import { ImageMapper } from './image.mapper';

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
