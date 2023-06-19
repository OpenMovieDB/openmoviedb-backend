import { registerEnumType } from '@nestjs/graphql';

export enum ReleaseDateType {
  WORLDWIDE = 'WORLDWIDE',
  THEATRICAL = 'THEATRICAL',
  DIGITAL = 'DIGITAL',
  PHYSICAL = 'PHYSICAL',
  TV = 'TV',
}

registerEnumType(ReleaseDateType, {
  name: 'ReleaseDateType',
  description: 'Type of the release date',
});
