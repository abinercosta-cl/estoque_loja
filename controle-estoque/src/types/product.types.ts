export interface ProductDTO {
  id: string;
  name: string;
  description: string | null;
  sku: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCreateInput {
  name: string;
  sku: string;
  price: number;
}
