// =============================================================================
// ESTRUTURA DE PASTAS — Decisões Arquiteturais
// Sistema de Controle de Estoque | Next.js App Router + TypeScript
// =============================================================================
//
// Este arquivo serve como referência viva para futuras discussões de arquitetura.
// Cada decisão estrutural está justificada com o "porquê" da escolha.
// =============================================================================

/\*\*

- SEPARAÇÃO DE RESPONSABILIDADES — O princípio central desta estrutura
-
- A arquitetura é organizada em 4 camadas distintas, da mais externa à mais interna:
-
- [UI Layer] src/app/ + src/components/
- [API Layer] src/app/api/
- [Business] src/services/
- [Data Access] lib/prisma.ts + Prisma ORM
-
- Regra de dependência: camadas externas dependem de internas, NUNCA o contrário.
- Uma página pode chamar um service. Um service NUNCA deve importar um componente.
  \*/

// =============================================================================
// 📁 prisma/
// =============================================================================
/\*\*

- Por que na raiz e não dentro de src/?
- O Prisma CLI espera o schema.prisma na raiz por convenção. Colocar dentro
- de src/ exige configuração extra no package.json e pode quebrar ferramentas
- de terceiros que dependem da localização padrão.
-
- prisma/schema.prisma → Fonte da verdade para os tipos do banco de dados
- prisma/migrations/ → Histórico auditável de mudanças no schema (Git-friendly)
  \*/

// =============================================================================
// 📁 src/app/ — App Router (Next.js 13+)
// =============================================================================
/\*\*

- Por que Route Groups com parênteses — (auth)/ e (dashboard)/?
- Route groups são pastas que NÃO geram segmentos de URL. Isso permite aplicar
- layouts diferentes para conjuntos de rotas sem afetar o caminho final.
-
- Exemplo prático:
- /app/(auth)/login/page.tsx → URL: /login (sem layout de dashboard)
- /app/(dashboard)/products/ → URL: /products (com sidebar e header)
-
- Sem route groups, teríamos que duplicar lógica de layout ou criar wrappers
- menos elegantes.
-
- Por que src/app/api/ e não um /api/ separado na raiz?
- Route Handlers do App Router vivem dentro de src/app/. Isso mantém API e
- UI colocalizadas: a rota /api/products/ fica no mesmo "universo" que a
- página /products/, facilitando o rastreamento de dependências.
  \*/

// =============================================================================
// 📁 src/components/ — Componentes React
// =============================================================================
/\*\*

- Separação ui/ vs features/ — Por que isso importa?
-
- components/ui/
- → Componentes "burros" (dumb components). Recebem props, renderizam HTML.
- → Não sabem nada sobre produtos, usuários ou regras de negócio.
- → São portáveis: podem ser extraídos para um design system independente.
- Exemplos: Button, Input, Modal, Badge, Table
-
- components/features/
- → Componentes "inteligentes" (smart components). Conectados a dados reais.
- → Podem fazer fetch, usar hooks de estado global, chamar actions.
- → Específicos do domínio da aplicação.
- Exemplos: ProductForm (sabe o que é um produto), ProductCard, UserAvatar
-
- Por que essa separação reduz débito técnico?
- Quando um designer pede para mudar o visual de um botão, você edita em UM
- lugar (ui/Button.tsx) e a mudança propaga para toda a aplicação. Sem essa
- separação, botões com comportamentos misturados se tornam impossíveis de
- refatorar com segurança.
  \*/

// =============================================================================
// 📁 src/lib/ — Configurações e Clientes de Bibliotecas
// =============================================================================
/\*\*

- lib/prisma.ts — O Singleton do PrismaClient
-
- Por que precisamos de um singleton?
- Em desenvolvimento, o hot-reload do Next.js recria módulos constantemente.
- Sem um singleton, cada reload criaria uma nova instância do PrismaClient,
- esgotando rapidamente as conexões disponíveis do SQLite (ou de qualquer BD).
-
- O padrão é:
- const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
- export const prisma = globalForPrisma.prisma ?? new PrismaClient()
- if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
-
- Em produção (processo único, sem hot-reload), o singleton não é necessário,
- mas também não causa problemas — o if garante isso.
  \*/

// =============================================================================
// 📁 src/services/ — Camada de Negócio (a mais importante desta arquitetura)
// =============================================================================
/\*\*

- Por que services/ e não colocar a lógica direto nas route handlers?
-
- Imagine que a regra "ao deletar um produto, reduzir o estoque para 0 antes"
- precisa ser aplicada tanto pela API REST quanto por um job agendado.
- Se essa lógica estiver no route handler, você vai duplicar ou importar
- de um lugar estranhamente acoplado.
-
- Com services/:
- - A rota DELETE /api/products/[id] chama productService.deleteProduct(id)
- - O job agendado também chama productService.deleteProduct(id)
- - A lógica vive em UM lugar e é testável isoladamente
-
- Testabilidade:
- - Você pode testar user.service.ts com um PrismaClient mockado sem precisar
-     de um servidor HTTP rodando. Isso torna os testes 10x mais rápidos.
-
- Convenção de nomenclatura:
- - Arquivos: [recurso].service.ts
- - Funções exportadas: verbo + substantivo (createProduct, deleteProduct)
- - Evitar classes: funções puras são mais fáceis de testar e tree-shake melhor
    \*/

// =============================================================================
// 📁 src/types/ — Tipos TypeScript Globais
// =============================================================================
/\*\*

- Por que não usar os tipos gerados pelo Prisma diretamente nas páginas?
-
- Os tipos do Prisma (ex: Prisma.User) expõem detalhes de implementação do
- banco de dados para a camada de UI. Se você renomear um campo no schema,
- o TypeScript vai reclamar em TODA a aplicação.
-
- Criando interfaces próprias em types/:
- export interface UserDTO {
-     id: string
-     name: string
-     email: string
-     role: 'ADMIN' | 'EMPLOYEE'
-     // passwordHash deliberadamente ausente — nunca exposto à UI
- }
-
- Os services são responsáveis por mapear Prisma.User → UserDTO.
- A UI nunca vê passwordHash. Essa barreira é intencional e importante.
  \*/

// =============================================================================
// 📁 src/utils/ — Funções Utilitárias Puras
// =============================================================================
/\*\*

- Critério para entrar em utils/ (todas as condições devem ser verdadeiras):
- 1.  É uma função pura (mesmo input → mesmo output, sem efeitos colaterais)
- 2.  Não tem dependência de contexto da aplicação (não usa prisma, não faz fetch)
- 3.  É reutilizável em pelo menos 2 contextos diferentes
-
- Se uma "util" precisa de contexto (ex: usuário logado), ela provavelmente
- é um hook (hooks/) ou parte de um service, não uma util.
-
- Exemplos corretos para utils/:
- formatCurrency(1999) → "R$ 19,99"
- isValidSKU("ABC-123") → true | false
- slugify("Tênis Nike") → "tenis-nike"
  \*/
