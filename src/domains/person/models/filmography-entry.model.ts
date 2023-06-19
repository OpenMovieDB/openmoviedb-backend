import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../../common/models/base.model';
import { PersonModel } from './person.model';
import { MovieModel } from '../../movie/models/movie.model';

export enum PersonRoleType {
  ACTOR = 'ACTOR',
  DIRECTOR = 'DIRECTOR',
  WRITER = 'WRITER',
  PRODUCER = 'PRODUCER',
  COMPOSER = 'COMPOSER',
  CINEMATOGRAPHER = 'CINEMATOGRAPHER',
  EDITOR = 'EDITOR',
}

registerEnumType(PersonRoleType, {
  name: 'PersonRoleType',
  description: 'Role of the person',
});

@ObjectType({ isAbstract: true })
export class FilmographyEntryModel extends BaseModel {
  @Field((type) => PersonRoleType)
  role: PersonRoleType;

  @Field({ nullable: true })
  description?: string;
}

@ObjectType()
export class FilmographyEntryMovieModel extends FilmographyEntryModel {
  @Field()
  movieId: string;

  @Field((type) => PersonModel)
  person: PersonModel;
}

@ObjectType()
export class FilmographyEntryPersonModel extends FilmographyEntryModel {
  @Field()
  personId: string;

  @Field((type) => MovieModel)
  movie: MovieModel;
}
