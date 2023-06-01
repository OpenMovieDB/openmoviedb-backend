import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSeasonInput {
  @Field()
  movieId!: string;

  @Field(() => Int)
  number: number;

  @Field({ nullable: true })
  releaseDate?: string;
}
