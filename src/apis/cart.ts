//////////////////////// TYPE DEFINITIONS //////////////////////////

export type Cart = {
  id: number;
  title?: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string; // string value of the thumbnail image url
  images?: string[]; // array of string values of the image urls
};
