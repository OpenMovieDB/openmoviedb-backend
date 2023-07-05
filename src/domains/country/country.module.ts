import { Module } from '@nestjs/common';
import { CountryResolver } from './country.resolver';
import { CountryService } from './country.service';

import CountryLoader from './country.loader';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [ImageModule],
  providers: [CountryResolver, CountryService, CountryLoader],
  exports: [CountryService],
})
export class CountryModule {}
