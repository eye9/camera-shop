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
  Amateur = 'non-professional',
  Professional = 'professional',
}
