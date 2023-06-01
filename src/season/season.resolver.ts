import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SeasonService } from './season.service';
import { SeasonModel } from './models/season.model';
import { CreateSeasonsInput } from './dto/create-seasons.input';
import { UpdateSeasonsInput } from './dto/update-seasons.input';

@Resolver(() => SeasonModel)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  @Mutation(() => SeasonModel)
  async createMany(@Args('data') data: CreateSeasonsInput): Promise<SeasonModel[]> {
    return this.seasonService.createMany(data);
  }

  @Mutation(() => SeasonModel)
  async updateMany(@Args('data') data: UpdateSeasonsInput): Promise<SeasonModel[]> {
    return this.seasonService.updateMany(data);
  }
}
