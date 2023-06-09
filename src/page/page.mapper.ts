import { Page } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { PageModel } from './models/page.model';

type PageEntity = Page;

export class PageMapper implements IMapper<PageEntity, PageModel> {
  public mapEntityToModel(entity: PageEntity): PageModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: PageEntity[]): PageModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
