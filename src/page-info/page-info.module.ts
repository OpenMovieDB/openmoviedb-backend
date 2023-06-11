import { Module } from '@nestjs/common';
import { PageInfoResolver } from './page-info.resolver';
import { PageInfoService } from './page-info.service';
import PagesInfoLoader from './pages-info.loader';
import { SeoModule } from '../seo/seo.module';

@Module({
  imports: [SeoModule],
  providers: [PageInfoResolver, PageInfoService, PagesInfoLoader],
  exports: [PageInfoService],
})
export class PageInfoModule {}
