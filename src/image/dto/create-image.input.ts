import { Field } from '@nestjs/graphql';

export class CreateImageInput {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field()
  createReadStream: Function;
}
