import { InputType, Field, PickType, Int } from '@nestjs/graphql';
import { NumberFilterInput } from 'src/common/dto/number-filter.input';
import { AbstractRelationFilterInput } from 'src/common/dto/abstract-relation-filter.input';
import { AbstractEntityFilterInput } from 'src/common/dto/abstract-entity-filter.input';
import { RatingVendorEnumInput } from 'src/rating/models/vendor-rating.enum';
import { MovieModel } from '../models/movie.model';
import { type } from 'os';
import { MovieType } from '@prisma/client';

@InputType()
export class CreateMovieInput {
  @Field()
  slug: string;

  @Field()
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
