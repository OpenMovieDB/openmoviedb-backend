import { Module } from '@nestjs/common';
import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';
import GenreLoader from './genre.loader';
import { ImageModule } from 'src/domains/image/image.module';

@Module({
  imports: [ImageModule],
  providers: [GenreResolver, GenreService, GenreLoader],
  exports: [GenreService],
})
export class GenreModule {}
