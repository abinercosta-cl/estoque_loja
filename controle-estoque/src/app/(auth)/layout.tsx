export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // min-h-screen: Garante que ocupe 100% da altura da tela
    // bg-gray-50: Um fundo cinza bem clarinho e elegante
    // flex items-center justify-center: Centraliza o conteúdo no meio exato da tela
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
