import { Resolver } from '@nestjs/graphql';
import { PersonService } from './person.service';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}
}
