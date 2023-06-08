import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ImageService } from './image.service';
import { ImageModel } from './models/image.model';

@Resolver(() => ImageModel)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}
}
