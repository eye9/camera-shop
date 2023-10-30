import { Product, PromoProduct } from '../types/product';
import { system, name, datatype, lorem, commerce } from 'faker';

export const makeFakePromo = (): PromoProduct => ({
  id: datatype.number(),
  name: name.title(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
});

export const makeFakeProduct = (): Product => ({
  id: datatype.number(),
  name: name.title(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
  vendorCode: datatype.uuid(),
  type: datatype.string(),
  category: datatype.string(),
  description: lorem.paragraph(),
  level: datatype.string(),
  price: +commerce.price(),
  rating: datatype.number(5),
  reviewCount: datatype.number(),
});
