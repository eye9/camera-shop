import { Product, PromoProduct } from '../types/product';
import { system, name, datatype, lorem, commerce } from 'faker';
import { Review } from '../types/review';

export const makeFakeReview = (): Review => ({
  id: datatype.string(),
  cameraId: datatype.number(),
  userName: name.title(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.paragraph(),
  rating: datatype.number(5),
  createAt: datatype.datetime().toDateString(),
});

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
