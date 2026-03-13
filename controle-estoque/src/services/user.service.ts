import { prisma } from '../lib/prisma'; // Correção 1: Usando caminho relativo
import bcrypt from 'bcryptjs';
import { UserCreateInput, UserDTO } from '../types/users.types'; // Correção 1: Usando caminho relativo

export const userService = {
  async createUser(data: UserCreateInput): Promise<UserDTO> {
    // 1. Verifica se o e-mail já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Operação negada: Este e-mail já está cadastrado.');
    }

    // 2. Cria o hash da senha (salt de 10 rounds)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Salva no banco de dados
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: hashedPassword,
      },
    });

    // 4. Correção 2: Retorno explícito para evitar o erro de variável não utilizada e garantir o UserDTO
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  async getUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    // Retorno explícito
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};
