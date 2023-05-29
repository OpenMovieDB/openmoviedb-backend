import { Field, InputType } from '@nestjs/graphql';
import { AbstractTypeFilterInput } from './abstract-type-filter.input';

@InputType('UuidFilterInput')
export class UuidFilterInput extends AbstractTypeFilterInput(String) {}
