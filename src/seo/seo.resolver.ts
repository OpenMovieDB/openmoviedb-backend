import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SeoModel } from './models/seo.model';
import { SeoService } from './seo.service';
import { CreateManySeoInput } from './dto/create-many-seo-input';
import { UpdateManySeoInput } from './dto/update-many-seo-input';

@Resolver(() => SeoModel)
export class SeoResolver {
  constructor(private readonly seoService: SeoService) {}

  @Mutation(() => [SeoModel])
  async createSeos(@Args('data') data: CreateManySeoInput): Promise<SeoModel[]> {
    return this.seoService.createMany(data);
  }

  @Mutation(() => [SeoModel])
  async updateSeos(@Args('data') data: UpdateManySeoInput): Promise<SeoModel[]> {
    return this.seoService.updateMany(data);
  }
}
