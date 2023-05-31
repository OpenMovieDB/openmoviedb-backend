import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ExternalIDModel } from './models/external-id.model';
import { CreateExternalIdsInput } from './dto/create-external-ids.input';
import { ExternalIdService } from './external-id.service';

@Resolver(() => ExternalIDModel)
export class ExternalIdResolver {
  constructor(private readonly externalIdService: ExternalIdService) {}

  @Mutation(() => [ExternalIDModel])
  async createMany(@Args('data') data: CreateExternalIdsInput): Promise<ExternalIDModel[]> {
    return this.externalIdService.createMany(data);
  }
}
