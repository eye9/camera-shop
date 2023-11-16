export const AppParams = {
  Page: 'page',
  SortType: 'sort',
  SortOrder: 'order',
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
