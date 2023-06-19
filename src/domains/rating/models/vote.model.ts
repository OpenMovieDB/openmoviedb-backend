import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../common/models/base.model';

@ObjectType()
export class VoteModel extends BaseModel {
  @Field((type) => Int)
  value: number;

  @Field({ nullable: true })
  userId?: string;

  @Field()
  ratingId: string;
}
