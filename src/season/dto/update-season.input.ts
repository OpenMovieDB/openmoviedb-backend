import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateSeasonInput } from './create-season.input';

@InputType()
export class UpdateSeasonInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field({ nullable: true })
  number?: number;

  @Field({ nullable: true })
  releaseDate?: string;
}
