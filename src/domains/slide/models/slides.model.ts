import { ObjectType } from '@nestjs/graphql';
import { SlideModel } from './slide.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class SlidesModel extends Paginated(SlideModel) {}
