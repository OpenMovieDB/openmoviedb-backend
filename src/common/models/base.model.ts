import { Field, ObjectType, ID } from '@nestjs/graphql';
import e from 'express';
import { BaseDateModel } from './base-date.model';

@ObjectType({ isAbstract: true })
export abstract class BaseModel extends BaseDateModel {
  @Field(() => ID)
  id: string;
}
