import { Injectable } from '@nestjs/common';
import { MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client';
import { Prisma } from '@prisma/client';
import { ExternalIDSource, ExternalIDType, MovieType, Vendor } from '.prisma/client';
import slugify from 'slugify';
import { VendorType } from 'src/domains/rating/models/vendor-rating.enum';

@Injectable()
export class KpMovieConverter {
  model2CreateMovie(model: MovieDtoV13): Prisma.MovieCreateInput {
    const enTitleObj = model.names.find((name) => name.language === 'us');
    const slugName = enTitleObj || model.name || model.alternativeName || model.enName || model.names[0]?.name;
    const slug = this.toSlug(slugName + ' ' + model.year);

    const externalIDs = Object.keys(model.externalId)
      .map((key) => ({
        source: this.idSource2IdSourceType(key),
        value: String(model.externalId[key]),
        type: ExternalIDType.MOVIE,
      }))
      .filter((id) => id.source && id.value);

    externalIDs.push({ source: VendorType.KINOPOISK, value: String(model.id), type: ExternalIDType.MOVIE });

    return {
      type: model.isSeries ? MovieType.TV_SERIES : MovieType.MOVIE,
      title: model.name || enTitleObj?.name,
      originalTitle: model.alternativeName,
      pageInfo: {
        create: { title: model.name || model.alternativeName + ' ' + model.year, description: model.description },
      },
      externalID: {
        connectOrCreate: externalIDs.map((id) => ({
          where: { source_value: { source: id.source, value: id.value } },
          create: { source: id.source, value: id.value, type: id.type },
        })),
      },
      rating: {
        create: {
          vendorRatings: {
            createMany: {
              data: Object.keys(model.rating)
                .map((key) => ({ vendor: this.vendor2VendorType(key), value: model.rating[key] }))
                .filter((rating) => rating.vendor),
            },
          },
        },
      },
      slug,
      year: model.year,
      genres: {
        connectOrCreate: model.genres.map(({ name }) => {
          const { title, slug } = this.findGenre(name);

          return {
            where: { slug },
            create: { title, slug, pageInfo: { create: { title } } },
          };
        }),
      },
      countries: {
        connectOrCreate: model.countries.map(({ name }) => {
          const { title, slug } = this.findCountry(name);

          return {
            where: { slug },
            create: { title, slug, pageInfo: { create: { title } } },
          };
        }),
      },
      fact: {
        createMany: {
          data:
            model?.facts?.map((fact) => ({
              isSpoiler: fact.spoiler,
              content: fact.value,
            })) || [],
        },
      },
    };
  }

  models2CreateMovies(models: MovieDtoV13[]): Prisma.MovieCreateInput[] {
    return models.map((model) => this.model2CreateMovie(model));
  }

  vendor2VendorType(type: string): Vendor {
    switch (type) {
      case 'kinopoisk':
        return Vendor.KINOPOISK;
      case 'kp':
        return Vendor.KINOPOISK;
      case 'imdb':
        return Vendor.IMDB;
      case 'tmdb':
        return Vendor.TMDB;
      default:
        console.warn(`Unknown vendor type: ${type}`);
        break;
    }
  }

  idSource2IdSourceType(type: string): ExternalIDSource {
    switch (type) {
      case 'kinopoisk':
        return ExternalIDSource.KINOPOISK;
      case 'imdb':
        return ExternalIDSource.IMDB;
      case 'tmdb':
        return ExternalIDSource.TMDB;
      default:
        console.warn(`Unknown id source type: ${type}`);
        break;
    }
  }

  private toSlug(name: string): string {
    return slugify(name, { lower: true, remove: /[^\p{L}\p{N} ]/gu, trim: true });
  }

  findGenre(name: string): { title: string; slug: string; description?: string } {
    const genres = [
      { name: 'аниме', slug: 'anime' },
      { name: 'биография', slug: 'biography' },
      { name: 'боевик', slug: 'action' },
      { name: 'вестерн', slug: 'western' },
      { name: 'военный', slug: 'military' },
      { name: 'детектив', slug: 'detective' },
      { name: 'детский', slug: 'childrens' },
      { name: 'для взрослых', slug: 'for-adults' },
      { name: 'документальный', slug: 'documentary' },
      { name: 'драма', slug: 'drama' },
      { name: 'игра', slug: 'game' },
      { name: 'история', slug: 'history' },
      { name: 'комедия', slug: 'comedy' },
      { name: 'концерт', slug: 'concert' },
      { name: 'короткометражка', slug: 'short-film' },
      { name: 'криминал', slug: 'crime' },
      { name: 'мелодрама', slug: 'melodrama' },
      { name: 'музыка', slug: 'music' },
      { name: 'мультфильм', slug: 'cartoon' },
      { name: 'мюзикл', slug: 'musical' },
      { name: 'новости', slug: 'news' },
      { name: 'приключения', slug: 'adventure' },
      { name: 'реальное ТВ', slug: 'reality-TV' },
      { name: 'семейный', slug: 'family' },
      { name: 'спорт', slug: 'sport' },
      { name: 'ток-шоу', slug: 'talk-show' },
      { name: 'триллер', slug: 'thriller' },
      { name: 'ужасы', slug: 'horror' },
      { name: 'фантастика', slug: 'fantasy' },
      { name: 'фильм-нуар', slug: 'film-noir' },
      { name: 'фэнтези', slug: 'fantasy' },
      { name: 'церемония', slug: 'ceremony' },
    ];

    const foundGenre = genres.find((g) => g.name === name);

    if (foundGenre)
      return {
        title: foundGenre.name,
        slug: this.toSlug(foundGenre.slug),
        description: `Список лучших фильмов и сериалов в ${foundGenre.name} — OpenMovieDB.`,
      };

    return null;
  }

  findCountry(name: string): { title: string; slug: string; description?: string } {
    const countries = [
      { name: 'Австралия', slug: 'Australia' },
      { name: 'Австрия', slug: 'Austria' },
      { name: 'Азербайджан', slug: 'Azerbaijan' },
      { name: 'Албания', slug: 'Albania' },
      { name: 'Алжир', slug: 'Algeria' },
      { name: 'Американские Виргинские острова', slug: 'US-Virgin-Islands' },
      { name: 'Американское Самоа', slug: 'American-Samoa' },
      { name: 'Ангола', slug: 'Angola' },
      { name: 'Андорра', slug: 'Andorra' },
      { name: 'Антарктида', slug: 'Antarctica' },
      { name: 'Антигуа и Барбуда', slug: 'Antigua-and-Barbuda' },
      { name: 'Антильские Острова', slug: 'Netherlands-Antilles' },
      { name: 'Аргентина', slug: 'Argentina' },
      { name: 'Армения', slug: 'Armenia' },
      { name: 'Аруба', slug: 'Aruba' },
      { name: 'Афганистан', slug: 'Afghanistan' },
      { name: 'Багамы', slug: 'Bahamas' },
      { name: 'Бангладеш', slug: 'Bangladesh' },
      { name: 'Барбадос', slug: 'Barbados' },
      { name: 'Бахрейн', slug: 'Bahrain' },
      { name: 'Беларусь', slug: 'Belarus' },
      { name: 'Белиз', slug: 'Belize' },
      { name: 'Бельгия', slug: 'Belgium' },
      { name: 'Бенин', slug: 'Benin' },
      { name: 'Берег Слоновой кости', slug: 'Ivory-Coast' },
      { name: 'Бермуды', slug: 'Bermuda' },
      { name: 'Бирма', slug: 'Myanmar' },
      { name: 'Болгария', slug: 'Bulgaria' },
      { name: 'Боливия', slug: 'Bolivia' },
      { name: 'Босния', slug: 'Bosnia' },
      { name: 'Босния и Герцеговина', slug: 'Bosnia-and-Herzegovina' },
      { name: 'Ботсвана', slug: 'Botswana' },
      { name: 'Бразилия', slug: 'Brazil' },
      { name: 'Бруней-Даруссалам', slug: 'Brunei-Darussalam' },
      { name: 'Буркина-Фасо', slug: 'Burkina-Faso' },
      { name: 'Бурунди', slug: 'Burundi' },
      { name: 'Бутан', slug: 'Bhutan' },
      { name: 'Вануату', slug: 'Vanuatu' },
      { name: 'Ватикан', slug: 'Vatican' },
      { name: 'Великобритания', slug: 'United-Kingdom' },
      { name: 'Венгрия', slug: 'Hungary' },
      { name: 'Венесуэла', slug: 'Venezuela' },
      { name: 'Виргинские Острова', slug: 'Virgin-Islands' },
      { name: 'Внешние малые острова США', slug: 'United-states-minor-outlying-islands' },
      { name: 'Вьетнам', slug: 'Vietnam' },
      { name: 'Вьетнам Северный', slug: 'North-Vietnam' },
      { name: 'Габон', slug: 'Gabon' },
      { name: 'Гаити', slug: 'Haiti' },
      { name: 'Гайана', slug: 'Guyana' },
      { name: 'Гамбия', slug: 'Gambia' },
      { name: 'Гана', slug: 'Ghana' },
      { name: 'Гваделупа', slug: 'Guadeloupe' },
      { name: 'Гватемала', slug: 'Guatemala' },
      { name: 'Гвинея', slug: 'Guinea' },
      { name: 'Гвинея-Бисау', slug: 'Guinea-Bissau' },
      { name: 'Германия', slug: 'Germany' },
      { name: 'Германия (ГДР)', slug: 'Germany-GDR' },
      { name: 'Германия (ФРГ)', slug: 'Germany-FRG' },
      { name: 'Гибралтар', slug: 'Gibraltar' },
      { name: 'Гондурас', slug: 'Honduras' },
      { name: 'Гонконг', slug: 'Hong-Kong' },
      { name: 'Гренада', slug: 'Grenada' },
      { name: 'Гренландия', slug: 'Greenland' },
      { name: 'Греция', slug: 'Greece' },
      { name: 'Грузия', slug: 'Georgia' },
      { name: 'Гуам', slug: 'Guam' },
      { name: 'Дания', slug: 'Denmark' },
      { name: 'Джибути', slug: 'Djibouti' },
      { name: 'Доминика', slug: 'Dominica' },
      { name: 'Доминикана', slug: 'Dominican-Republic' },
      { name: 'Египет', slug: 'Egypt' },
      { name: 'Заир', slug: 'Zaire' },
      { name: 'Замбия', slug: 'Zambia' },
      { name: 'Западная Сахара', slug: 'Western-Sahara' },
      { name: 'Зимбабве', slug: 'Zimbabwe' },
      { name: 'Израиль', slug: 'Israel' },
      { name: 'Индия', slug: 'India' },
      { name: 'Индонезия', slug: 'Indonesia' },
      { name: 'Иордания', slug: 'Jordan' },
      { name: 'Ирак', slug: 'Iraq' },
      { name: 'Иран', slug: 'Iran' },
      { name: 'Ирландия', slug: 'Ireland' },
      { name: 'Исландия', slug: 'Iceland' },
      { name: 'Испания', slug: 'Spain' },
      { name: 'Италия', slug: 'Italy' },
      { name: 'Йемен', slug: 'Yemen' },
      { name: 'Кабо-Верде', slug: 'Cabo Verde' },
      { name: 'Казахстан', slug: 'Kazakhstan' },
      { name: 'Каймановы острова', slug: 'Cayman Islands' },
      { name: 'Камбоджа', slug: 'Cambodia' },
      { name: 'Камерун', slug: 'Cameroon' },
      { name: 'Канада', slug: 'Canada' },
      { name: 'Катар', slug: 'Qatar' },
      { name: 'Кения', slug: 'Kenia' },
      { name: 'Кипр', slug: 'Cyprus' },
      { name: 'Киргизия', slug: 'Kyrgyzstan' },
      { name: 'Кирибати', slug: 'Kiribati' },
      { name: 'Китай', slug: 'China' },
      { name: 'Колумбия', slug: 'Colombia' },
      { name: 'Коморы', slug: 'Comoros' },
      { name: 'Конго', slug: 'Congo' },
      { name: 'Конго (ДРК)', slug: 'Congo (DRC)' },
      { name: 'Корея', slug: 'Korea' },
      { name: 'Корея Северная', slug: 'North Korea' },
      { name: 'Корея Южная', slug: 'South Korea' },
      { name: 'Косово', slug: 'Kosovo' },
      { name: 'Коста-Рика', slug: 'Costa Rica' },
      { name: 'Кот-д’Ивуар', slug: "Cote d'Ivoire" },
      { name: 'Куба', slug: 'Cuba' },
      { name: 'Кувейт', slug: 'Kuwait' },
      { name: 'Лаос', slug: 'Laos' },
      { name: 'Латвия', slug: 'Latvia' },
      { name: 'Лесото', slug: 'Lesotho' },
      { name: 'Либерия', slug: 'Liberia' },
      { name: 'Ливан', slug: 'Lebanon' },
      { name: 'Ливия', slug: 'Libya' },
      { name: 'Литва', slug: 'Lithuania' },
      { name: 'Лихтенштейн', slug: 'Liechtenstein' },
      { name: 'Люксембург', slug: 'Luxembourg' },
      { name: 'Маврикий', slug: 'Mauritius' },
      { name: 'Мавритания', slug: 'Mauritania' },
      { name: 'Мадагаскар', slug: 'Madagascar' },
      { name: 'Макао', slug: 'Macao' },
      { name: 'Македония', slug: 'Macedonia' },
      { name: 'Малави', slug: 'Malawi' },
      { name: 'Малайзия', slug: 'Malaysia' },
      { name: 'Мали', slug: 'Mali' },
      { name: 'Мальдивы', slug: 'Maldives' },
      { name: 'Мальта', slug: 'Malta' },
      { name: 'Марокко', slug: 'Morocco' },
      { name: 'Мартиника', slug: 'Martinique' },
      { name: 'Маршалловы острова', slug: 'Marshall Islands' },
      { name: 'Мексика', slug: 'Mexico' },
      { name: 'Мозамбик', slug: 'Mozambique' },
      { name: 'Молдова', slug: 'Moldova' },
      { name: 'Монако', slug: 'Monaco' },
      { name: 'Монголия', slug: 'Mongolia' },
      { name: 'Монтсеррат', slug: 'Montserrat' },
      { name: 'Мьянма', slug: 'Myanmar' },
      { name: 'Намибия', slug: 'Namibia' },
      { name: 'Непал', slug: 'Nepal' },
      { name: 'Нигер', slug: 'Niger' },
      { name: 'Нигерия', slug: 'Nigeria' },
      { name: 'Нидерланды', slug: 'Netherlands' },
      { name: 'Никарагуа', slug: 'Nicaragua' },
      { name: 'Новая Зеландия', slug: 'New Zealand' },
      { name: 'Новая Каледония', slug: 'New Caledonia' },
      { name: 'Норвегия', slug: 'Norway' },
      { name: 'ОАЭ', slug: 'UAE' },
      { name: 'Оккупированная Палестинская территория', slug: 'Occupied Palestinian Territory' },
      { name: 'Оман', slug: 'Oman' },
      { name: 'Остров Мэн', slug: 'Isle of Man' },
      { name: 'Острова Кука', slug: 'Cook Islands' },
      { name: 'Пакистан', slug: 'Pakistan' },
      { name: 'Палау', slug: 'Palau' },
      { name: 'Палестина', slug: 'Palestine' },
      { name: 'Панама', slug: 'Panama' },
      { name: 'Папуа - Новая Гвинея', slug: 'Papua New Guinea' },
      { name: 'Парагвай', slug: 'Paraguay' },
      { name: 'Перу', slug: 'Peru' },
      { name: 'Польша', slug: 'Poland' },
      { name: 'Португалия', slug: 'Portugal' },
      { name: 'Пуэрто Рико', slug: 'Puerto Rico' },
      { name: 'Реюньон', slug: 'Reunion' },
      { name: 'Российская империя', slug: 'Russian Empire' },
      { name: 'Россия', slug: 'Russia' },
      { name: 'Руанда', slug: 'Rwanda' },
      { name: 'Румыния', slug: 'Romania' },
      { name: 'СССР', slug: 'USSR' },
      { name: 'США', slug: 'USA' },
      { name: 'Сальвадор', slug: 'El Salvador' },
      { name: 'Самоа', slug: 'Samoa' },
      { name: 'Сан-Марино', slug: 'San Marino' },
      { name: 'Саудовская Аравия', slug: 'Saudi Arabia' },
      { name: 'Свазиленд', slug: 'Swaziland' },
      { name: 'Северная Македония', slug: 'North Macedonia' },
      { name: 'Сейшельские острова', slug: 'Seychelles' },
      { name: 'Сенегал', slug: 'Senegal' },
      { name: 'Сент-Винсент и Гренадины', slug: 'Saint Vincent and the Grenadines' },
      { name: 'Сент-Китс и Невис', slug: 'Saint Kitts and Nevis' },
      { name: 'Сент-Люсия ', slug: 'Saint Lucia' },
      { name: 'Сербия', slug: 'Serbia' },
      { name: 'Сербия и Черногория', slug: 'Serbia and Montenegro' },
      { name: 'Сиам', slug: 'Siam' },
      { name: 'Сингапур', slug: 'Singapore' },
      { name: 'Сирия', slug: 'Syria' },
      { name: 'Словакия', slug: 'Slovakia' },
      { name: 'Словения', slug: 'Slovenia' },
      { name: 'Соломоновы Острова', slug: 'Solomon Islands' },
      { name: 'Сомали', slug: 'Somalia' },
      { name: 'Судан', slug: 'Sudan' },
      { name: 'Суринам', slug: 'Suriname' },
      { name: 'Сьерра-Леоне', slug: 'Sierra Leone' },
      { name: 'Таджикистан', slug: 'Tajikistan' },
      { name: 'Таиланд', slug: 'Thailand' },
      { name: 'Тайвань', slug: 'Taiwan' },
      { name: 'Танзания', slug: 'Tanzania' },
      { name: 'Тимор-Лесте', slug: 'Timor-Leste' },
      { name: 'Того', slug: 'Togo' },
      { name: 'Тонга', slug: 'Tonga' },
      { name: 'Тринидад и Тобаго', slug: 'Trinidad and Tobago' },
      { name: 'Тувалу', slug: 'Tuvalu' },
      { name: 'Тунис', slug: 'Tunisia' },
      { name: 'Туркменистан', slug: 'Turkmenistan' },
      { name: 'Турция', slug: 'Turkey' },
      { name: 'Уганда', slug: 'Uganda' },
      { name: 'Узбекистан', slug: 'Uzbekistan' },
      { name: 'Украина', slug: 'Ukraine' },
      { name: 'Уоллис и Футуна', slug: 'Wallis and Futuna' },
      { name: 'Уругвай', slug: 'Uruguay' },
      { name: 'Фарерские острова', slug: 'Faroe Islands' },
      { name: 'Федеративные Штаты Микронезии', slug: 'Federated States of Micronesia' },
      { name: 'Фиджи', slug: 'Fiji' },
      { name: 'Филиппины', slug: 'Philippines' },
      { name: 'Финляндия', slug: 'Finland' },
      { name: 'Фолклендские острова', slug: 'Falkland Islands' },
      { name: 'Франция', slug: 'France' },
      { name: 'Французская Гвиана', slug: 'French Guiana' },
      { name: 'Французская Полинезия', slug: 'French Polynesia' },
      { name: 'Хорватия', slug: 'Croatia' },
      { name: 'ЦАР', slug: 'CAR' },
      { name: 'Чад', slug: 'Chad' },
      { name: 'Черногория', slug: 'Montenegro' },
      { name: 'Чехия', slug: 'Czechia' },
      { name: 'Чехословакия', slug: 'Czechoslovakia' },
      { name: 'Чили', slug: 'Chile' },
      { name: 'Швейцария', slug: 'Switzerland' },
      { name: 'Швеция', slug: 'Sweden' },
      { name: 'Шри-Ланка', slug: 'Sri Lanka' },
      { name: 'Эквадор', slug: 'Ecuador' },
      { name: 'Экваториальная Гвинея', slug: 'Equatorial Guinea' },
      { name: 'Эритрея', slug: 'Eritrea' },
      { name: 'Эстония', slug: 'Estonia' },
      { name: 'Эфиопия', slug: 'Ethiopia' },
      { name: 'ЮАР', slug: 'South Africa' },
      { name: 'Югославия', slug: 'Yugoslavia' },
      { name: 'Югославия (ФР)', slug: 'Yugoslavia (FR)' },
      { name: 'Ямайка', slug: 'Jamaica' },
      { name: 'Япония', slug: 'Japan' },
    ];

    const foundCountry = countries.find((c) => c.name === name);

    if (foundCountry)
      return {
        title: foundCountry.name,
        slug: this.toSlug(foundCountry.slug),
        description: `Лучшие фильмы и сериалы снятые в ${foundCountry.name} — OpenMovieDB`,
      };

    return null;
  }
}
