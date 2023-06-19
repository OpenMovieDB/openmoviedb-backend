import { Resolver } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { PersonModel } from './models/person.model';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { BaseResolver } from '../../common/resolvers/base.resolver';
import { FindPersonsInput } from './dto/find-persons.input';
import { PersonsModel } from './models/persons.model';

@Resolver(() => PersonModel)
export class PersonResolver extends BaseResolver(
  'Person',
  PersonModel,
  PersonsModel,
  FindPersonsInput,
  CreatePersonInput,
  UpdatePersonInput,
  PersonService,
) {
  constructor(private readonly personService: PersonService) {
    super(personService);
  }
}
