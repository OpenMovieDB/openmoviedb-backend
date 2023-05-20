import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

enum ExternalIDSource {
  IMDB,
  TMDB,
  WIKIPEDIA,
  KINOPOISK,
}

registerEnumType(ExternalIDSource, {
  name: 'ExternalIDSource',
  description: 'Source of the external id',
});

enum ExternalIDType {
  MOVIE,
  PERSON,
}

registerEnumType(ExternalIDType, {
  name: 'ExternalIDType',
  description: 'Type of the external id',
});

@ObjectType()
export class ExternalIDModel extends BaseModel {
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
