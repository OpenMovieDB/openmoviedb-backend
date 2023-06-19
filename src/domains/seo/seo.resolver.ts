import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SeoModel } from './models/seo.model';
import { SeoService } from './seo.service';
import { CreateManySeoInput } from './dto/create-many-seo-input';
import { UpdateManySeoInput } from './dto/update-many-seo-input';
import { ImageLinkModel } from '../image/models/image-link.model';
import SeosLoader from './seos.loader';

@Resolver(() => SeoModel)
export class SeoResolver {
  constructor(private readonly seoService: SeoService, private readonly seosLoader: SeosLoader) {}

  @Mutation(() => [SeoModel])
  async createSeos(@Args('data') data: CreateManySeoInput): Promise<SeoModel[]> {
    return this.seoService.createMany(data);
  }

  @Mutation(() => [SeoModel])
  async updateSeos(@Args('data') data: UpdateManySeoInput): Promise<SeoModel[]> {
    return this.seoService.updateMany(data);
  }

  @ResolveField('image', () => ImageLinkModel, { nullable: true })
  async images(@Parent() seo: SeoModel): Promise<ImageLinkModel> {
    return this.seosLoader.batchImages.load(seo.id);
  }
}
