import { Slider } from '@prisma/client';
import { IMapper } from '../../common/interfaces/mapper.interface';
import { SliderModel } from './models/slider.model';

type SliderEntity = Slider;

export class SliderMapper implements IMapper<SliderEntity, SliderModel> {
  public mapEntityToModel(entity: SliderEntity): SliderModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: SliderEntity[]): SliderModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
