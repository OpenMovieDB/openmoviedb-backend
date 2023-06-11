import PaginatedResponse from 'src/common/pagination/pagination';

import { ObjectType } from '@nestjs/graphql';
import { SlideModel } from './slide.model';

@ObjectType()
export class SlidesModel extends PaginatedResponse(SlideModel) {}
