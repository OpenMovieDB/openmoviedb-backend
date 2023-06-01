import { registerEnumType } from '@nestjs/graphql';

export enum SeoType {
  OPEN_GRAPH = 'OPEN_GRAPH',
  TWITTER_CARD = 'TWITTER_CARD',
  JSONLD = 'JSONLD',
  BASIC = 'BASIC',
}

registerEnumType(SeoType, {
  name: 'SeoType',
  description: 'Type of SEO',
});
