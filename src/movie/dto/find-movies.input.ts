import { InputType, Field } from '@nestjs/graphql';
import { StringFilterInput } from 'src/common/dto/string-filter.input';
import { UuidFilterInput } from 'src/common/dto/uuid-filter.input';

@InputType()
export class FindMoviesInput {
  @Field({ nullable: true })
  id?: UuidFilterInput;

  @Field({ nullable: true })
  title?: StringFilterInput;

  @Field({ nullable: true })
  slug?: StringFilterInput;
}
