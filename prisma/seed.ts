import {
  ExternalIDSource,
  ExternalIDType,
  MovieType,
  PersonRoleType,
  PrismaClient,
  ReleaseDateType,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  console.log('Seeding...');

  await prisma.user.createMany({
    data: [
      {
        email: 'mdwit0r+1@gmail.com',
        name: 'mdwit0r',
        password: '$2b$10$bglMMvpZoSKDTqVbr9IWLuNoQb.WKYSe0IUlUPluKV.U7yx826Hq.',
        role: 'USER',
      },
      {
        email: 'mdwit0r@gmail.com',
        name: 'mdwit',
        role: 'ADMIN',
        password: '$2b$10$bglMMvpZoSKDTqVbr9IWLuNoQb.WKYSe0IUlUPluKV.U7yx826Hq.',
      },
    ],
  });

  const image = await prisma.image.create({
    data: {
      id: 'd5b8c7bd-eed5-4873-9d17-da65c3f8c6f1',
      height: 563,
      width: 375,
      assets: {
        create: [
          {
            format: 'AVIF',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/e93abedc-a47d-44ab-afd6-bac5468f70b0_W375.avif',
            width: 'W375',
          },
          {
            format: 'AVIF',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/fb501673-627d-465f-8754-ef3d82ea0c8b_W768.avif',
            width: 'W768',
          },
          {
            format: 'WEBP',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/bdf44e99-2d49-410d-9312-fe74ff92afe8_ORIGINAL.webp',
            width: 'ORIGINAL',
          },
          {
            format: 'WEBP',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/cad13578-bdfc-440c-a87a-dbb93cb9cf42_W1366.webp',
            width: 'W1366',
          },
          {
            format: 'AVIF',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/085335d8-9052-45f4-b0ae-4cf087cb7fec_W1024.avif',
            width: 'W1024',
          },
          {
            format: 'WEBP',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/4b5688c8-1e9c-4fee-8c12-98c7058f7bb6_W375.webp',
            width: 'W375',
          },
          {
            format: 'WEBP',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/0512e45a-b9e1-44f1-abe5-766a75092496_W1024.webp',
            width: 'W1024',
          },
          {
            format: 'WEBP',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/3b1d9708-e790-44bd-9917-ea633ea13701_W768.webp',
            width: 'W768',
          },
          {
            format: 'AVIF',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/387767d7-7f39-4886-af82-7786e77234a1_ORIGINAL.avif',
            width: 'ORIGINAL',
          },
          {
            format: 'AVIF',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/0b1c28a2-5bf0-4f0b-af62-9ac81024426f_W1366.avif',
            width: 'W1366',
          },
          {
            format: 'WEBP',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/edd58d2f-c3a9-4584-8979-9c5a1aafc356_W1920.webp',
            width: 'W1920',
          },
          {
            format: 'AVIF',
            url: 'https://s3.timeweb.com/3f7bc49e-openmoviedb/d5b8c7bd-eed5-4873-9d17-da65c3f8c6f1/1367e133-5f92-4704-94f0-1851c02ca565_W1920.avif',
            width: 'W1920',
          },
        ],
      },
    },
  });

  const person = await prisma.person.create({
    data: {
      slug: 'test-person1',
      name: 'Test Person',
    },
  });

  const pageInfo = await prisma.pageInfo.create({
    data: {
      title: 'Test Page Info',
      description: 'Test Description',
    },
  });

  const genre = await prisma.genre.create({
    data: {
      slug: 'test-genre2',
      pageInfo: {
        connect: {
          id: pageInfo.id,
        },
      },
      title: 'Test Genre',
    },
  });

  const country = await prisma.country.create({
    data: {
      slug: 'test-country3',
      pageInfo: {
        connect: {
          id: pageInfo.id,
        },
      },
      title: 'Test Country',
    },
  });

  const movie = await prisma.movie.create({
    data: {
      slug: 'test-movie_4',
      type: MovieType.MOVIE,
      title: 'Test Movie 2',
      year: 2023,
      pageInfo: {
        connect: {
          id: pageInfo.id,
        },
      },
      externalID: {
        create: {
          source: ExternalIDSource.IMDB,
          type: ExternalIDType.MOVIE,
          value: 'tt1234564',
        },
      },
      genres: {
        connectOrCreate: {
          create: {
            slug: 'test-genre',
            title: 'Test Genre',
            pageInfo: {
              connect: {
                id: pageInfo.id,
              },
            },
          },
          where: { id: genre.id },
        },
      },
      countries: {
        connectOrCreate: {
          create: {
            slug: 'test-country',
            title: 'Test Country',
            pageInfo: {
              connect: {
                id: pageInfo.id,
              },
            },
          },
          where: { id: country.id },
        },
      },
      persons: {
        create: {
          role: PersonRoleType.ACTOR,
          person: {
            connect: {
              id: person.id,
            },
          },
          description: 'Main Character',
        },
      },
      releases: {
        create: {
          type: ReleaseDateType.THEATRICAL,
          date: new Date(),
          country: {
            connect: {
              id: country.id,
            },
          },
        },
      },
      rating: {
        create: {
          value: 5,
          vendorRatings: {
            create: {
              vendor: 'IMDB',
              value: 5,
            },
          },
        },
      },
      medias: {
        create: [
          {
            type: 'TRAILER',
            media: {
              create: {
                title: 'Test Trailer',
                source: 'YOUTUBE',
                image: {
                  create: {
                    type: 'POSTER',
                    image: {
                      create: {
                        height: 450,
                        width: 300,
                        assets: {
                          create: {
                            url: 'https//avatars.mds.yandex.net/get-kinopoisk-image/1898899/c5cabd6f-3a63-4711-9c58-13557a8acfbf/300x450',
                            format: 'WEBP',
                            width: 'W375',
                          },
                        },
                      },
                    },
                  },
                },
                assets: {
                  create: {
                    url: 'https://www.youtube.com/watch?v=1234567890',
                    source: 'YOUTUBE',
                    format: 'MP4',
                    duration: 4.31,
                  },
                },
              },
            },
          },
        ],
      },
      images: {
        create: {
          type: 'POSTER',
          image: {
            connect: {
              id: image.id,
            },
          },
        },
      },
    },
  });
  console.log(`Created movie with id: ${movie.id}`);
  console.log('Seeding... Done');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
