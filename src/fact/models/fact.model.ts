import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class FactModel extends BaseModel {
  @Field()
  movieId: string;

  @Field()
  content: string;

  @Field()
  isSpoiler: boolean;
}
