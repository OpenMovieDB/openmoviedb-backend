import { Module } from '@nestjs/common';
import { CountryResolver } from './country.resolver';
import { CountryService } from './country.service';
import { ImageModule } from 'src/image/image.module';
import CountryLoader from './country.loader';

@Module({
  imports: [ImageModule],
  providers: [CountryResolver, CountryService, CountryLoader],
  exports: [CountryService],
})
export class CountryModule {}
