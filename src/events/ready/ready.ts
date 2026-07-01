import { Events } from 'discord.js'
import { BotClient } from '../../core/Client'
import { BotEvent } from '../../util/types'

async function handleReady(client: BotClient) {
    console.log(`Online como ${client.user!.tag}`)
}

export default {
    name: Events.ClientReady,
    once: true,
    execute: handleReady,
} satisfies BotEvent