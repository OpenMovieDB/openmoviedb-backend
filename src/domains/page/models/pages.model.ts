import { ObjectType } from '@nestjs/graphql';
import { PageModel } from './page.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class PagesModel extends Paginated(PageModel) {}
