import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FactService } from './fact.service';
import { FactModel } from './models/fact.model';
import { CreateFactsInput } from './dto/create-facts.input';
import { BaseResolver } from '../common/resolvers/base.resolver';
import { FindFactsInput } from './dto/find-facts.input';
import { UpdateFactInput } from './dto/update-fact.input';
import { CreateFactInput } from './dto/create-fact.input';
import { FactsModel } from './models/facts.model';

@Resolver(() => FactModel)
export class FactResolver extends BaseResolver(
  'Fact',
  FactModel,
  FactsModel,
  FindFactsInput,
  CreateFactInput,
  UpdateFactInput,
  FactService,
) {
  constructor(private readonly factService: FactService) {
    super(factService);
  }

  @Mutation(() => [FactModel])
  async createFacts(@Args('data') data: CreateFactsInput): Promise<FactModel[]> {
    return this.factService.createMany(data);
  }
}
