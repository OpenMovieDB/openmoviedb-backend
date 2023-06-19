import { InputType, Field, Int } from '@nestjs/graphql';
import { MovieType } from '../models/movie-type.enum';

@InputType()
export class CreateMovieInput {
  @Field()
  slug: string;

  @Field()
  @Field((type) => MovieType)
  type: MovieType;

  @Field()
  title: string;

  @Field({ nullable: true })
  originalTitle?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int)
  year: number;
}
