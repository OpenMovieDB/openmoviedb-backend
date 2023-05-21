import { Image, ImageLink } from '@prisma/client';
import { IMapper } from 'src/common/interfaces/mapper.interface';
import { ImageLinkModel, ImageType } from 'src/common/models/image-link.model';

type ImageLinkEntity = ImageLink & {
  image: Image;
};

export class ImageLinkMapper implements IMapper<ImageLinkEntity, ImageLinkModel> {
  public mapEntityToModel(entity: ImageLinkEntity): ImageLinkModel {
    return {
      ...entity,
      type: ImageType[entity.type],
    };
  }

  public mapEntitiesToModels(entities: ImageLinkEntity[]): ImageLinkModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
