import { Module } from '@nestjs/common';
import { CountryResolver } from './country.resolver';
import { CountryService } from './country.service';

@Module({
  providers: [CountryResolver, CountryService],
  exports: [CountryService],
})
export class CountryModule {}
