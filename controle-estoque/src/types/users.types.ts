import { Role } from '@prisma/client';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateInput {
  name: string;
  email: string;
  password: string;
}
