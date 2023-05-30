import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDateModel } from 'src/common/models/base-date.model';
import { ExternalIDSource, ExternalIDType } from './external-id-type.enum';

@ObjectType()
export class ExternalIDModel extends BaseDateModel {
  @Field((type) => ExternalIDSource)
  source: ExternalIDSource;

  @Field((type) => ExternalIDType)
  type: ExternalIDType;

  @Field()
  value: string;

  @Field({ nullable: true })
  movieId?: string;

  @Field({ nullable: true })
  personId?: string;
}
