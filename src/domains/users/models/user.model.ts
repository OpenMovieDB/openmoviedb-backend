import 'reflect-metadata';
import { Field, HideField, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

import { Role } from '@prisma/client';
import { BaseModel } from '../../../common/models/base.model';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Role)
  role: Role;

  @HideField()
  password: string;
}
