'use client';

import { useState } from 'react';
// Importaremos o useRouter para redirecionar o usuário após o login no futuro
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(''); // Limpa erros anteriores
    setIsLoading(true); // Ativa o loading

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se a API retornar erro (ex: 401 Credenciais inválidas)
        setErrorMsg(data.error || 'Erro ao realizar login.');
        setIsLoading(false);
        return;
      }

      // Sucesso!
      console.log('Usuário logado:', data.user);
      alert(`Bem-vindo, ${data.user.name}!`);

      // O próximo passo da nossa arquitetura será redirecionar para o /dashboard aqui!
      // router.push('/dashboard');
    } catch (error) {
      console.error('Erro de rede:', error);
      setErrorMsg('Erro de conexão com o servidor.');
    } finally {
      setIsLoading(false); // Desativa o loading independentemente do resultado
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Acesso ao Sistema</h1>
        <p className="text-sm text-gray-500 mt-2">
          Insira suas credenciais para gerenciar o estoque.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {/* Alerta de Erro Visual */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {errorMsg}
          </div>
        )}

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
            disabled={isLoading}
          />
        </div>

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
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isLoading ? (
            <span className="animate-pulse">Autenticando...</span>
          ) : (
            'Entrar no Painel'
          )}
        </button>
      </form>
    </div>
  );
}
