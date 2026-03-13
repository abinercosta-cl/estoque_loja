import { NextResponse } from 'next/server';
import { userService } from '../../../services/user.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação básica do nosso QA
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Nome, E-mail e Senha são campos obrigatórios.' },
        { status: 400 }
      );
    }

    const newUser = await userService.createUser({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    // Retorna 201 Created e o DTO do usuário (SEM A SENHA!)
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    // Captura o erro do nosso serviço caso o e-mail já exista
    if (error.message.includes('já está cadastrado')) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar a requisição.' },
      { status: 500 }
    );
  }
}
