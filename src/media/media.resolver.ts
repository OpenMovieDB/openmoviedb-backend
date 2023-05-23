import { Args, Query, Resolver } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { MediaLinkModel } from './models/media-link.model';

@Resolver()
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => MediaLinkModel)
  async media(@Args('id') id: string): Promise<MediaLinkModel> {
    return this.mediaService.findOne(id);
  }
}
