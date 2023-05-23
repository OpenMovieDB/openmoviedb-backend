import { Field, ObjectType } from '@nestjs/graphql';
import { FilmographyEntryPersonModel } from './filmography-entry.model';
import { BaseModel } from '../../common/models/base.model';
import { ExternalIDModel } from '../../external-id/models/external-id.model';
import { ImageLinkModel } from '../../image/models/image-link.model';

@ObjectType()
export class PersonModel extends BaseModel {
  @Field()
  name: string;

  @Field((type) => [ExternalIDModel], { nullable: 'itemsAndList' })
  externalID?: ExternalIDModel[];

  @Field((type) => [ImageLinkModel], { nullable: 'itemsAndList' })
  images?: ImageLinkModel[];

  @Field((type) => [FilmographyEntryPersonModel], { nullable: 'itemsAndList' })
  filmography?: FilmographyEntryPersonModel[];
}
