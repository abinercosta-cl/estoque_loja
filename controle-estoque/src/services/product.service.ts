import { prisma } from '../lib/prisma';
import { ProductCreateInput, ProductDTO } from '../types/product.types';

export const productService = {
  async createProduct(data: ProductCreateInput): Promise<ProductDTO> {
    // 1. Regra de Negócio: Impede cadastro de SKUs duplicados
    const existingProduct = await prisma.product.findUnique({
      where: { sku: data.sku },
    });

    if (existingProduct) {
      throw new Error('Operação negada: O SKU fornecido já está em uso.');
    }

    // 2. Salva no banco de dados
    const product = await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        price: data.price,
      },
    });

    return product as ProductDTO;
  },

  async getProducts(): Promise<ProductDTO[]> {
    // Busca todos os produtos ordenando pelos mais recentes primeiro
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return products as ProductDTO[];
  },

  async deleteProduct(id: string): Promise<void> {
    // Deleta o produto pelo ID
    await prisma.product.delete({
      where: { id },
    });
  },
};
