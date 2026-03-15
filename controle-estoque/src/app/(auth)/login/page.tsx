'use client'; // Indica que este componente vai rodar no navegador (pois terá interação de clique)

import { useState } from 'react';

export default function LoginPage() {
  // Estados para guardarmos o que o usuário digita
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue ao dar submit
    console.log('Tentando logar com:', email, password);
    // Na próxima etapa, vamos conectar isso com a nossa API!
  };

  return (
    <div className="w-full max-w-md bg-white-700 rounded-xl shadow-lg p-8 border border-gray-300">
      {/* Cabeçalho do Card */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Acesso ao Sistema</h1>
        <p className="text-sm text-gray-500 mt-2">
          Insira suas credenciais para gerenciar o estoque.
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleLogin} className="space-y-6">
        {/* Campo de E-mail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="admin@loja.com"
            required
          />
        </div>

        {/* Campo de Senha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Botão de Entrar */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          Entrar no Painel
        </button>
      </form>
    </div>
  );
}
