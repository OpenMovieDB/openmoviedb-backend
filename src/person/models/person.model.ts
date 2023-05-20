import { Field, ObjectType } from '@nestjs/graphql';
import { FilmographyEntryPersonModel } from './filmography-entry.model';
import { BaseModel } from '../../common/models/base.model';
import { ExternalIDModel } from '../../external-id/models/external-id.model';
import { ImageModel } from '../../common/models/image.model';

@ObjectType()
export class PersonModel extends BaseModel {
  @Field()
  name: string;

  @Field((type) => [ExternalIDModel], { nullable: 'itemsAndList' })
  externalID?: ExternalIDModel[];

  @Field((type) => [ImageModel], { nullable: 'itemsAndList' })
  images?: ImageModel[];

  @Field((type) => [FilmographyEntryPersonModel], { nullable: 'itemsAndList' })
  filmography?: FilmographyEntryPersonModel[];
}
