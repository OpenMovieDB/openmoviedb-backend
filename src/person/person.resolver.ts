import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { PersonModel } from './models/person.model';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';

@Resolver(() => PersonModel)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Mutation(() => PersonModel)
  async create(@Args('data') data: CreatePersonInput): Promise<PersonModel> {
    return this.personService.create(data);
  }

  @Mutation(() => PersonModel)
  async update(@Args('data') data: UpdatePersonInput): Promise<PersonModel> {
    return this.personService.update(data);
  }
}
