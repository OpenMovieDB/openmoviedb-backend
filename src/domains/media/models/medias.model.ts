import { ObjectType } from '@nestjs/graphql';

import { MediaModel } from './media.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class MediasModel extends Paginated(MediaModel) {}
