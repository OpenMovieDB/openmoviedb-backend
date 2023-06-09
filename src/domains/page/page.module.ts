import { Module } from '@nestjs/common';
import { PageResolver } from './page.resolver';
import { PageService } from './page.service';
import PagesLoader from './page.loader';
import { PageInfoModule } from '../page-info/page-info.module';
import { BlockModule } from '../block/block.module';

@Module({
  imports: [PageInfoModule, BlockModule],
  providers: [PageResolver, PageService, PagesLoader],
  exports: [PageService],
})
export class PageModule {}
