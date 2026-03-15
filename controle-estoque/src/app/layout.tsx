import '../app/global.css'; // Aqui está a mágica que chama o Tailwind!
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistema de Estoque',
  description: 'Controle de estoque e gestão de produtos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* antialiased deixa as fontes mais suaves e bonitas no navegador */}
      <body className="antialiased bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
