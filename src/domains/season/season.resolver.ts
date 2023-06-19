import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SeasonService } from './season.service';
import { SeasonModel } from './models/season.model';
import { CreateEpisodesInput } from './dto/create-episodes.input';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { BaseResolver } from '../../common/resolvers/base.resolver';
import { CreateSeasonInput } from './dto/create-season.input';
import { FindSeasonsInput } from './dto/find-seasons.input';
import { SeasonsModel } from './models/seasons.model';
import { UpdateSeasonInput } from './dto/update-season.input';

@Resolver(() => SeasonModel)
export class SeasonResolver extends BaseResolver(
  'Season',
  SeasonModel,
  SeasonsModel,
  FindSeasonsInput,
  CreateSeasonInput,
  UpdateSeasonInput,
  SeasonService,
) {
  constructor(private readonly seasonService: SeasonService) {
    super(seasonService);
  }

  @Mutation(() => SeasonModel)
  async addEpisodes(@Args('data') data: CreateEpisodesInput): Promise<SeasonModel> {
    return this.seasonService.addEpisodes(data);
  }

  @Mutation(() => SeasonModel)
  updateEpisodes(@Args('id') id: string, @Args('data') data: UpdateEpisodeInput): Promise<SeasonModel> {
    return this.seasonService.updateEpisode(id, data);
  }
}
