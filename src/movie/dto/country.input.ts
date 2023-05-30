import { InputType, Field } from '@nestjs/graphql';

import { AbstractRelationListFilterInput } from 'src/common/dto/abstract-relation-list-filter.input';
import { StringFilterInput } from 'src/common/dto/string-filter.input';
import { UuidFilterInput } from 'src/common/dto/uuid-filter.input';

@InputType()
export class CountryWhereInput {
  @Field({ nullable: true })
  id?: UuidFilterInput;

  @Field({ nullable: true })
  slug?: StringFilterInput;

  @Field({ nullable: true })
  title?: StringFilterInput;
}

@InputType()
export class CountryRelationInput extends AbstractRelationListFilterInput(CountryWhereInput) {}
