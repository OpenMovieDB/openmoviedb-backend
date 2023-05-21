import { Image } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { ImageModel } from '../common/models/image.model';

type ImageEntity = Image;

export class ImageMapper implements IMapper<ImageEntity, ImageModel> {
  public mapEntityToModel(entity: ImageEntity): ImageModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: ImageEntity[]): ImageModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
