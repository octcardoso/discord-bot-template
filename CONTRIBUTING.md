# Guia de Contribuição

Documentação técnica do projeto: convenções, padrões e como estender o bot.

---

## Sumário

- [Ambiente de desenvolvimento](#ambiente-de-desenvolvimento)
- [Convenções](#convenções)
- [Adicionando um comando](#adicionando-um-comando)
- [Adicionando um evento](#adicionando-um-evento)
- [Adicionando um handler de botão](#adicionando-um-handler-de-botão)
- [Fluxo de desenvolvimento](#fluxo-de-desenvolvimento)

---

## Ambiente de desenvolvimento

```bash
npm run dev    # Inicia em modo desenvolvimento (guild commands, instantâneo)
npm run build  # Compila TypeScript para JavaScript
npm start      # Inicia em modo produção (global commands)
```

Em desenvolvimento, os slash commands são registrados apenas no servidor de teste definido em `config.ts`. Em produção, são registrados globalmente (pode levar até 1h para propagar).

---

## Convenções

### Nomenclatura

| O quê | Padrão | Exemplo |
|---|---|---|
| Arquivos | `camelCase` | `commandLoader.ts` |
| Classes | `PascalCase` | `BotClient` |
| Interfaces | `PascalCase` | `BotCommand` |
| Funções | `camelCase` | `loadCommands()` |
| Variáveis | `camelCase` | `commandFiles` |
| Pastas | `camelCase` | `guildMemberAdd/` |

### Estrutura de arquivos

- Cada comando em seu próprio arquivo dentro de `commands/public/` ou `commands/private/`
- Cada evento em sua própria pasta dentro de `events/`
- Cada handler de botão em seu próprio arquivo dentro de `interactions/buttons/`
- Tipos e interfaces em `util/types/`

### Exports

- Todo comando, evento e handler usa `export default`
- Tipos e interfaces usam `export interface` / `export type`
- O `util/types/index.ts` reexporta tudo — importe sempre de `../util/types`, nunca do arquivo específico

---

## Adicionando um comando

**1.** Crie o arquivo em `src/commands/public/` ou `src/commands/private/`:

```typescript
// src/commands/public/meuComando.ts
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { BotCommand } from '../../util/types'

async function execute(interaction: ChatInputCommandInteraction) {

}

export default {
    data: new SlashCommandBuilder()
        .setName('meu-comando')
        .setDescription('Descrição do comando'),
    ownerOnly: false,
    execute,
} satisfies BotCommand
```

**2.** Pronto. O `CommandLoader` detecta e registra automaticamente na próxima inicialização.

> Comandos em `private/` devem ter `ownerOnly: true` — o `interactionCreate` bloqueia automaticamente usuários sem permissão.

---

## Adicionando um evento

**1.** Crie uma pasta com o nome do evento em `src/events/`:

```
src/events/meuEvento/meuEvento.ts
```

**2.** Escreva o handler seguindo a interface `BotEvent`:

```typescript
// src/events/meuEvento/meuEvento.ts
import { Events } from 'discord.js'
import { BotClient } from '../../core/Client'
import { BotEvent } from '../../util/types'

async function handleMeuEvento(client: BotClient, ...args: any[]) {
    // lógica aqui
}

export default {
    name: Events.NomeDoEvento,
    once: false, // true = executa só uma vez (ex: ClientReady)
    execute: handleMeuEvento,
} satisfies BotEvent
```

**3.** Pronto. O `EventLoader` detecta automaticamente.

---

## Fluxo de desenvolvimento

```
feature/nome-da-feature
    ↓ desenvolvimento
   main
    ↓ deploy
produção
```

- Nunca commitar o `.env`
- Testar em guild (dev) antes de subir para global (produção)