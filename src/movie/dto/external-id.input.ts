import { InputType, Field } from '@nestjs/graphql';

import { AbstractRelationListFilterInput } from 'src/common/dto/abstract-relation-list-filter.input';
import { StringFilterInput } from 'src/common/dto/string-filter.input';
import { ExternalIDSourceEnumInput, ExternalIDTypeEnumInput } from 'src/external-id/models/external-id-type.enum';

@InputType()
export class ExternalIdWhereInput {
  @Field({ nullable: true })
  value?: StringFilterInput;

  @Field({ nullable: true })
  source?: ExternalIDSourceEnumInput;

  @Field({ nullable: true })
  type?: ExternalIDTypeEnumInput;
}

@InputType()
export class ExternalIdRelationInput extends AbstractRelationListFilterInput(ExternalIdWhereInput) {}
