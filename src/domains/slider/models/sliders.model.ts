import { SliderModel } from './slider.model';
import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class SlidersModel extends Paginated(SliderModel) {}
