import { Slide } from '@prisma/client';
import { IMapper } from '../../common/interfaces/mapper.interface';
import { SlideModel } from './models/slide.model';

type SlideEntity = Slide;

export class SlideMapper implements IMapper<SlideEntity, SlideModel> {
  public mapEntityToModel(entity: SlideEntity): SlideModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: SlideEntity[]): SlideModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
