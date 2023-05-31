import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FactService } from './fact.service';
import { FactModel } from './models/fact.model';
import { CreateFactsInput } from './dto/create-facts.input';

@Resolver(() => FactModel)
export class FactResolver {
  constructor(private readonly factService: FactService) {}

  @Mutation(() => [FactModel])
  async createMany(@Args('data') data: CreateFactsInput): Promise<FactModel[]> {
    return this.factService.createMany(data);
  }
}
