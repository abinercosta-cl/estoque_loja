export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (Menu Lateral) */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo / Nome do Sistema */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="font-bold text-xl text-blue-600 tracking-tight">
            EstoquePRO
          </span>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 p-4 space-y-2">
          {/* O link ativo fica com fundo azul */}
          <a
            href="/dashboard"
            className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium transition-colors"
          >
            Visão Geral
          </a>
          {/* Links inativos ficam cinzas */}
          <a
            href="/dashboard/produtos"
            className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            Produtos
          </a>
        </nav>

        {/* Rodapé da Sidebar (Botão de Sair) */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors text-left">
            Sair do sistema
          </button>
        </div>
      </aside>

      {/* Área Principal (Lado direito) */}
      <main className="flex-1 flex flex-col">
        {/* Cabeçalho Topo */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Painel de Controle
          </h2>

          {/* Avatar do Usuário */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              A
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </header>

        {/* Conteúdo Dinâmico (Aqui entram as páginas) */}
        <div className="flex-1 p-8 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
