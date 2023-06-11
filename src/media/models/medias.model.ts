import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { MediaModel } from './media.model';

@ObjectType()
export class MediasModel extends PaginatedResponse(MediaModel) {}
