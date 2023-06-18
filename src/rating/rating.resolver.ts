import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { RatingModel } from './models/rating.model';
import { CreateManyVendorRatingInput } from './dto/create-many-vendor-rating.input';
import { UpdateVendorRatingInput } from './dto/update-vendor-rating.input';

@Resolver(() => RatingModel)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Mutation(() => RatingModel)
  createManyVendorRating(@Args('ratingId') ratingId: string, @Args('data') dto: CreateManyVendorRatingInput) {
    return this.ratingService.createManyVendorRating(ratingId, dto);
  }

  @Mutation(() => RatingModel)
  updateVendorRating(@Args('di') id: string, @Args('data') dto: UpdateVendorRatingInput) {
    return this.ratingService.updateVendorRating(id, dto);
  }
}
