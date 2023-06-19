import PaginatedResponse from 'src/common/pagination/pagination';
import { SliderModel } from './slider.model';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SlidersModel extends PaginatedResponse(SliderModel) {}
