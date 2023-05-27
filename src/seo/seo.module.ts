import { Module } from '@nestjs/common';
import { SeoResolver } from './seo.resolver';
import { SeoService } from './seo.service';

@Module({
  providers: [SeoResolver, SeoService],
  exports: [SeoService],
})
export class SeoModule {}
