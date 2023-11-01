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
