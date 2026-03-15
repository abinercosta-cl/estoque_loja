export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Título da Página */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resumo do Estoque</h1>
        <p className="text-sm text-gray-500 mt-1">
          Acompanhe os principais indicadores da sua loja.
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Total de Produtos
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">124</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Valor Estimado em Estoque
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">R$ 45.200,00</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Itens com Baixo Estoque
          </h3>
          <p className="text-3xl font-bold text-red-600 mt-2">5</p>
        </div>
      </div>

      {/* Espaço para futura Tabela de Últimos Adicionados */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Últimos Produtos Cadastrados
        </h3>
        <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
          <span className="text-gray-400 text-sm">
            A tabela de produtos entrará aqui em breve.
          </span>
        </div>
      </div>
    </div>
  );
}
