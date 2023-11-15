export const AppParams = {
  Page: 'page',
  SortType: 'sort',
  SortOrder: 'order',
} as const;

export const SortTypes = {
  Price: 'price',
  Popularity: 'popular',
} as const;

export enum SortOrders {
  Any = 'any',
  Asc = 'asc',
  Desc = 'desc',
}
