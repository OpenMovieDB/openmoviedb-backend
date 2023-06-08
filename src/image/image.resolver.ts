import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImageService } from './image.service';
import { ImageModel } from './models/image.model';

@Resolver(() => ImageModel)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Query(() => [ImageModel])
  async images(): Promise<ImageModel[]> {
    return this.imageService.findManyImages();
  }
}
