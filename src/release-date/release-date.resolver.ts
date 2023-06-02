import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ReleaseDateModel } from './models/release-date.model';
import { ReleaseDateService } from './release-date.service';
import { CreateReleaseDatesInput } from './dto/create-release-dates.input';

@Resolver(() => ReleaseDateModel)
export class ReleaseDateResolver {
  constructor(private readonly releaseDateService: ReleaseDateService) {}

  @Mutation(() => [ReleaseDateModel])
  async createReleaseDates(@Args('data') data: CreateReleaseDatesInput): Promise<ReleaseDateModel[]> {
    return this.releaseDateService.createReleaseDates(data);
  }
}
