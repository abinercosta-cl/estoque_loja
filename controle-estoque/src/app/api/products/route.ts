import { NextResponse } from 'next/server';
import { productService } from '../../../services/product.service';

// Rota para LISTAR todos os produtos
export async function GET() {
  try {
    const products = await productService.getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar produtos.' },
      { status: 500 }
    );
  }
}

// Rota para CRIAR um novo produto
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação básica: garante que a requisição mandou os dados certos
    if (!body.name || !body.sku || body.price === undefined) {
      return NextResponse.json(
        { error: 'Nome, SKU e Preço são campos obrigatórios.' },
        { status: 400 }
      );
    }

    const newProduct = await productService.createProduct({
      name: body.name,
      sku: body.sku,
      price: body.price,
    });

    return NextResponse.json(newProduct, { status: 201 }); // 201 = Created
  } catch (error: any) {
    // Aqui nós capturamos aquele erro exato de SKU duplicado do nosso service!
    if (error.message.includes('já está em uso')) {
      return NextResponse.json({ error: error.message }, { status: 409 }); // 409 = Conflict
    }

    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar a requisição.' },
      { status: 500 }
    );
  }
}
