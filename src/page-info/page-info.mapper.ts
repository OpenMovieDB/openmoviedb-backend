import { PageInfo, Seo } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { PageInfoModel } from 'src/page-info/page-info.model';
import { SeoEntity, SeoMapper } from 'src/seo/seo.mapper';

type PageInfoEntity = PageInfo & { seo: SeoEntity[] };

export class PageInfoMapper implements IMapper<PageInfoEntity, PageInfoModel> {
  public mapEntityToModel(entity: PageInfoEntity): PageInfoModel {
    return {
      ...entity,
      seo: new SeoMapper().mapEntitiesToModels(entity.seo),
    };
  }

  public mapEntitiesToModels(entities: PageInfoEntity[]): PageInfoModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
