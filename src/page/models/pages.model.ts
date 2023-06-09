import { Field, ObjectType } from '@nestjs/graphql';
import { BasePageModel } from '../../common/models/base-page.model';
import { Block } from 'ts-morph';
import { BlockModel } from '../../block/models/block.model';
import { PageModel } from './page.model';
import PaginatedResponse from 'src/common/pagination/pagination';

@ObjectType()
export class PagesModel extends PaginatedResponse(PageModel) {}
