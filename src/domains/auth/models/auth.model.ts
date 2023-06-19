import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/domains/users/models/user.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
