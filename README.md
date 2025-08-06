# Weekly Purse

## 📱 O que é o projeto?

O **Weekly Purse** é um aplicativo de gestão de orçamento semanal simples e eficaz. Desenvolvido com foco mobile-first, permite que usuários planejem e acompanhem seus gastos de forma organizada ao longo da semana, oferecendo controle financeiro pessoal de maneira intuitiva.

### Principais funcionalidades:
- 💰 Planejamento e acompanhamento de orçamento semanal
- � Monitoramento diário de despesas
- � Análises visuais de gastos
- � Design responsivo com foco em dispositivos móveis

## 🎯 Por que foi feito?

Este projeto foi criado para resolver a dificuldade comum de controlar gastos semanais de forma prática e visual. Muitas pessoas têm dificuldade em acompanhar seus gastos diários e se manter dentro do orçamento planejado. O Weekly Purse oferece uma solução simples e direta, permitindo:

- Visualização clara do orçamento semanal
- Controle imediato de gastos diários
- Alertas preventivos antes de estourar o orçamento
- Interface amigável que incentiva o uso constante

## ⚙️ Como funciona?

### Tecnologias utilizadas:
- **Frontend:** React 18 com TypeScript para tipagem estática
- **Estilização:** Tailwind CSS + shadcn/ui para componentes elegantes
- **Mobile:** Capacitor para criação de apps nativos
- **Build:** Vite para desenvolvimento e build rápidos
- **Ícones:** Lucide React
- **Gráficos:** Recharts para visualizações
- **Formulários:** React Hook Form + Zod para validação
- **Gerenciamento de Estado:** Hooks customizados e Context API

### Arquitetura:
```
src/
  ├── components/          # Componentes reutilizáveis
  │   ├── ui/             # Componentes do shadcn/ui
  │   ├── BudgetCard.tsx  # Card de exibição do orçamento
  │   ├── Header.tsx      # Cabeçalho da aplicação
  │   └── ...
  ├── hooks/              # Hooks React customizados
  ├── lib/                # Bibliotecas utilitárias
  ├── pages/              # Componentes de página
  ├── utils/              # Funções utilitárias
  └── main.tsx           # Ponto de entrada da aplicação
```

## 🚀 Como executar ou usar?

### Pré-requisitos:
- Node.js 18+
- npm

### Instalação e execução local:

1. **Clone o repositório**
```bash
git clone <repository-url>
cd weekly-purse
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:8082/
```

### Scripts disponíveis:
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run build:dev` - Build para desenvolvimento
- `npm run lint` - Executa ESLint
- `npm run preview` - Preview do build de produção

### Para dispositivos móveis (Android):

1. **Faça o build da aplicação web**
```bash
npm run build
```

2. **Sincronize com Android**
```bash
npx cap sync android
```

3. **Abra no Android Studio**
```bash
npx cap open android
```

## 🎓 O que aprendi e possíveis melhorias

### Aprendizados técnicos:
- **TypeScript avançado:** Implementação de tipos complexos e interfaces
- **React moderno:** Uso de hooks customizados e otimização de performance
- **Design System:** Integração do shadcn/ui para consistência visual
- **Mobile Development:** Configuração do Capacitor para apps nativos
- **State Management:** Gerenciamento eficiente de estado sem bibliotecas externas

### Aprendizados pessoais:
- Importância de um design mobile-first
- Como criar interfaces intuitivas para controle financeiro
- Balanceamento entre funcionalidades e simplicidade

### Possíveis melhorias:
- 🔄 Sincronização em nuvem para backup dos dados
- 📊 Relatórios mensais e análises mais detalhadas
- 🏷️ Sistema de categorização de gastos
- 👥 Compartilhamento de orçamentos familiares
- 🔔 Notificações push nativas
- 🌐 Suporte para múltiplas moedas
- 📱 Versão para iOS
- 🧪 Implementação de testes automatizados

## 📞 Contato e links úteis

### 👨‍💻 Desenvolvedor: Oliver Kobayashi

- **LinkedIn:** [linkedin.com/in/oliver-kobayashi](https://linkedin.com/in/oliver-kobayashi)
- **GitHub:** [github.com/oliverkobayashi](https://github.com/oliverkobayashi)
- **Email:** oliverkobayashi@gmail.com
---

## 📄 Licença

Este projeto está disponível sob a licença [MIT License](LICENSE).
