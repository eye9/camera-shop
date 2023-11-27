import { FilterItem } from './types';

export const AppParams = {
  Page: 'page',
  SortType: 'sort',
  SortOrder: 'order',
  Category: 'category',
  Type: 'type',
  Level: 'level',
} as const;

export enum SortTypes {
  Price = 'price',
  Popularity = 'popular',
}

export enum SortOrders {
  Any = 'any',
  Asc = 'asc',
  Desc = 'desc',
}

export enum FilterCategory {
  Photo = 'photocamera',
  Video = 'videocamera',
}

export enum FilterType {
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collectible = 'collection',
}

export enum FilterLevel {
  Zero = 'zero',
  Amateur = 'amateur',
  Professional = 'professional',
}

export const FilterCategories: FilterItem[] = [
  {
    label: 'Фотокамера',
    dbName: 'Фотоаппарат',
    name: FilterCategory.Photo,
  },
  {
    label: 'Видеокамера',
    dbName: 'Видеокамера',
    name: FilterCategory.Video,
  },
];
export const FilterTypes: FilterItem[] = [
  {
    label: 'Цифровая',
    dbName: 'Цифровая',
    name: FilterType.Digital,
  },
  {
    label: 'Плёночная',
    dbName: 'Плёночная',
    name: FilterType.Film,
  },
  {
    label: 'Моментальная',
    dbName: 'Моментальная',
    name: FilterType.Snapshot,
  },
  {
    label: 'Коллекционная',
    dbName: 'Коллекционная',
    name: FilterType.Collectible,
  },
];
export const FilterLevels: FilterItem[] = [
  {
    label: 'Нулевой',
    dbName: 'Нулевой',
    name: FilterLevel.Zero,
  },
  {
    label: 'Любительский',
    dbName: 'Любительский',
    name: FilterLevel.Amateur,
  },
  {
    label: 'Профессиональный',
    dbName: 'Профессиональный',
    name: FilterLevel.Professional,
  },
];
