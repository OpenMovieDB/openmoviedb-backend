import { Block, Collection, ImageLink, Movie, PageInfo } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { CollectionModel } from './models/collection.model';
import { ImageLinkMapper } from 'src/image/mappers/image-link.mapper';
import { BlockMapper } from 'src/block/block.mapper';
import { MovieMapper } from 'src/movie/movie.mapper';

type CollectionEntity = Collection & {
  images: ImageLink[];
  movies: Movie[];
  block: Block;
  pageInfo: PageInfo;
  seo: any;
};

// TODO: Implement CollectionMapper
// export class CollectionMapper implements IMapper<CollectionEntity, CollectionModel> {
//   public mapEntityToModel(entity: CollectionEntity): CollectionModel {
//     return {
//       ...entity,
//       pageInfo: entity.pageInfo,
//       seo: entity.seo,
//       images: new ImageLinkMapper().mapEntitiesToModels(entity.images),
//       movies: new MovieMapper().mapEntitiesToModels(entity.movies),
//       block: new BlockMapper().mapEntityToModel(entity.block),
//     };
//   }

//   public mapEntitiesToModels(entities: CollectionEntity[]): CollectionModel[] {
//     return entities.map((entity) => this.mapEntityToModel(entity));
//   }
// }
