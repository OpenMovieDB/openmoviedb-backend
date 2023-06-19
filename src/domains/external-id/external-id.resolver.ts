import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ExternalIDModel } from './models/external-id.model';
import { ExternalIDService } from './external-id.service';
import { BaseResolver } from '../../common/resolvers/base.resolver';
import { ExternalIDsModel } from './models/external-ids.model';
import { CreateExternalIDInput } from './dto/create-external-id.input';
import { UpdateExternalIDInput } from './dto/update-external-id.input';
import { FindExternalIDsInput } from './dto/find-external-ids.input';
import { CreateExternalIDsInput } from './dto/create-external-ids.input';

@Resolver(() => ExternalIDModel)
export class ExternalIdResolver extends BaseResolver(
  'ExternalID',
  ExternalIDModel,
  ExternalIDsModel,
  FindExternalIDsInput,
  CreateExternalIDInput,
  UpdateExternalIDInput,
  ExternalIDService,
) {
  constructor(private readonly externalIDService: ExternalIDService) {
    super(externalIDService);
  }

  @Mutation(() => [ExternalIDModel])
  async createExternalIds(@Args('data') data: CreateExternalIDsInput): Promise<ExternalIDModel[]> {
    return this.externalIDService.createMany(data);
  }
}
