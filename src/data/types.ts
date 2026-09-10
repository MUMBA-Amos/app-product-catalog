//in here we declaring shapes of Api product and its response shape
export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  description: string;
  rating: number;
}

export interface ProductResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}
