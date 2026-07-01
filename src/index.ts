import 'dotenv/config'
import { GatewayIntentBits } from 'discord.js'
import { BotClient } from './core/Client'
import { config } from './config/config'
import { loadEvents } from './core/EventLoader'
import { loadCommands } from './core/CommandLoader'

const client = new BotClient(
  {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences
    ], 
  },
  config
)

async function main() {
  await loadEvents(client)
  await loadCommands(client)
  await client.login(process.env.TOKEN)
}

main()