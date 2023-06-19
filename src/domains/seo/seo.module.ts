import { Module } from '@nestjs/common';
import { SeoResolver } from './seo.resolver';
import { SeoService } from './seo.service';
import SeosLoader from './seos.loader';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [ImageModule],
  providers: [SeoResolver, SeoService, SeosLoader],
  exports: [SeoService],
})
export class SeoModule {}
