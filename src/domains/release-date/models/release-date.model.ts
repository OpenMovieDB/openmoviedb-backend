import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../common/models/base.model';
import { ReleaseDateType } from './release-date-type.enum';

@ObjectType()
export class ReleaseDateModel extends BaseModel {
  @Field()
  movieId?: string;

  @Field((type) => ReleaseDateType)
  type: ReleaseDateType;

  @Field()
  date: Date;
}
