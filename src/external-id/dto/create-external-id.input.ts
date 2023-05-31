import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ExternalIDSource, ExternalIDType } from '../models/external-id-type.enum';

@InputType()
export class CreateExternalIdInput {
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
