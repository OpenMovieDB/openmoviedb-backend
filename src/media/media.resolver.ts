import { Args, Query, Resolver } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { MediaLinkModel } from './models/media-link.model';
import { BaseResolver } from '../common/resolvers/base.resolver';
import { MediaModel } from './models/media.model';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { MediasModel } from './models/medias.model';
import { FindMediasInput } from './dto/find-medias.input';

@Resolver()
export class MediaResolver extends BaseResolver(
  'Media',
  MediaModel,
  MediasModel,
  FindMediasInput,
  CreateMediaInput,
  UpdateMediaInput,
  MediaService,
) {
  constructor(private readonly mediaService: MediaService) {
    super(mediaService);
  }

  @Query(() => MediaLinkModel)
  async media(@Args('id') id: string): Promise<MediaLinkModel> {
    return this.mediaService.findOne(id);
  }
}
