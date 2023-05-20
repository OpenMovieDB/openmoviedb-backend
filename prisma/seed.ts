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
        password:
          '$2b$10$bglMMvpZoSKDTqVbr9IWLuNoQb.WKYSe0IUlUPluKV.U7yx826Hq.',
        role: 'USER',
      },
      {
        email: 'mdwit0r@gmail.com',
        name: 'mdwit',
        role: 'ADMIN',
        password:
          '$2b$10$bglMMvpZoSKDTqVbr9IWLuNoQb.WKYSe0IUlUPluKV.U7yx826Hq.',
      },
    ],
  });

  const person = await prisma.person.create({
    data: {
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
      slug: 'test-movie',
      type: MovieType.MOVIE,
      title: 'Test Movie',
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
          value: 'tt1234567',
        },
      },
      genres: {
        connectOrCreate: {
          create: {
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
