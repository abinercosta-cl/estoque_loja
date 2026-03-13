import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { mensagem: 'API respondendo, chefe!' },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  return NextResponse.json(
    { mensagem: 'Produto recebido com sucesso!' },
    { status: 201 }
  );
}
