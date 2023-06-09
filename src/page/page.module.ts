import { Module } from '@nestjs/common';
import { PageResolver } from './page.resolver';
import { PageService } from './page.service';
import PagesLoader from './page.loader';
import { PageInfoModule } from 'src/page-info/page-info.module';

@Module({
  imports: [PageInfoModule],
  providers: [PageResolver, PageService, PagesLoader],
})
export class PageModule {}
