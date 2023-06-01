import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SeasonService } from './season.service';
import { SeasonModel } from './models/season.model';
import { CreateSeasonsInput } from './dto/create-seasons.input';
import { UpdateSeasonInput } from './dto/update-season.input';
import { CreateEpisodesInput } from './dto/create-episodes.input';
import { UpdateEpisodeInput } from './dto/update-episode.input';

@Resolver(() => SeasonModel)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  @Mutation(() => [SeasonModel])
  async createSeasons(@Args('data') data: CreateSeasonsInput): Promise<SeasonModel[]> {
    return this.seasonService.createMany(data);
  }

  @Mutation(() => SeasonModel)
  async updateSeasons(@Args('data') data: UpdateSeasonInput): Promise<SeasonModel> {
    return this.seasonService.update(data);
  }

  @Mutation(() => SeasonModel)
  async addEpisodes(@Args('data') data: CreateEpisodesInput): Promise<SeasonModel> {
    return this.seasonService.addEpisodes(data);
  }

  @Mutation(() => SeasonModel)
  updateEpisodes(@Args('data') data: UpdateEpisodeInput): Promise<SeasonModel> {
    return this.seasonService.updateEpisode(data);
  }
}
