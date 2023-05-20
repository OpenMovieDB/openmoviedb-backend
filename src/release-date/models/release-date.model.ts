import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

enum ReleaseDateType {
  WORLDWIDE,
  THEATRICAL,
  DIGITAL,
  PHYSICAL,
  TV,
}

registerEnumType(ReleaseDateType, {
  name: 'ReleaseDateType',
  description: 'Type of the release date',
});

@ObjectType()
export class ReleaseDateModel extends BaseModel {
  @Field((type) => ReleaseDateType)
  type: ReleaseDateType;

  @Field()
  date: Date;
}
