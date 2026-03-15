import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    // 2. Busca o usuário no banco (precisamos do registro completo, incluindo o hash da senha)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Se o usuário não existir, retornamos erro genérico por segurança
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }
      );
    }

    // 3. Compara a senha digitada em texto plano com o hash do banco
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }
      );
    }

    // 4. Sucesso! Removemos a senha antes de devolver os dados para o frontend
    const { passwordHash, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: 'Login realizado com sucesso!', user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro na rota de login:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar o login.' },
      { status: 500 }
    );
  }
}
