import { Module } from '@nestjs/common';
import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';

@Module({
  providers: [RatingResolver, RatingService]
})
export class RatingModule {}
