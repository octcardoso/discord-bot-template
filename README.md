# Discord Bot Template

Base para construir bots do Discord sem precisar montar a estrutura inicial do zero.

> Template pessoal em desenvolvimento ativo. Construído com TypeScript e discord.js v14.

---

## Sumário

- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar localmente](#como-rodar-localmente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Contribuindo](#contribuindo)
- [Nota](#nota)

---

## Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [discord.js v14](https://discord.js.org/)
- [dotenv](https://github.com/motdotla/dotenv)

---

## Estrutura do projeto

```
src/
├── commands/
│   ├── private/         # Comandos do desenvolvedor
│   └── public/          # Comandos disponíveis para todos
├── config/
│   └── config.ts        # Configurações do bot (IDs, prefixos...)
├── core/
│   ├── Client.ts        # Extensão do Client do discord.js
│   ├── CommandLoader.ts # Carrega e registra slash commands
│   └── EventLoader.ts   # Carrega os eventos
├── data/
│   └── repositories/    # Persistência em JSON (temporário)
├── events/
│   ├── guildMemberAdd/
│   ├── interactionCreate/
│   └── ready/
├── interactions/
│   ├── buttons/         # Handlers de botões
│   ├── flows/           # Lógica de fluxos interativos
│   └── modals/          # Handlers de modais
└── util/
    └── types/           # Interfaces e tipos globais
```

---

## Como rodar localmente

**Pré-requisitos:** Node.js 18+ e npm instalados.

```bash
# Clone o repositório
git clone https://github.com/octcardoso/discord-bot-template
cd discord-bot-template

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env
# Edite o .env com seus valores

# Rode em modo desenvolvimento
npm run dev
```

---

## Variáveis de ambiente

Copie o `.env.example` e preencha os valores:

```env
TOKEN=      # Token do bot
```

As demais configurações ficam em `src/config/config.ts`.

---

## Contribuindo

Veja o guia completo em [CONTRIBUTING.md](./CONTRIBUTING.md) — inclui convenções de código, como adicionar comandos e eventos, e o fluxo de desenvolvimento.
