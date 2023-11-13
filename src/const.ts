export const MainCatalogSettings = {
  CardsPerPage: 9,
  MaxPagesVisible: 3
} as const;

export const APIRoutes = {
  Products: '/cameras',
  Promo: '/promo',
  Reviews: '/reviews',
} as const;

export const AppRoutes = {
  Main: '/',
  Product: '/product',
  Busket: '/busket',
  Any: '*',
} as const;

export const NameSpace = {
  Review: 'REVIEW',
  Busket: 'BUSKET',
  Product: 'PRODUCT',
} as const;

export const ReviewFieldsLength = {
  Min: 2,
  Max: 160,
} as const;

export const ReviewRateTitles = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];
