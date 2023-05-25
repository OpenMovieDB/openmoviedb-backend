import { Module } from '@nestjs/common';
import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';

@Module({
  providers: [GenreResolver, GenreService],
  exports: [GenreService],
})
export class GenreModule {}
