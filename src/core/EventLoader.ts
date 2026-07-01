import { readdirSync } from 'fs'
import { join } from 'path'
import { BotClient } from './Client'
import { BotEvent } from '../util/types'

export async function loadEvents(client: BotClient, eventsDir: string = join(__dirname, '..', 'events')) : Promise<void> {
    const eventFolders = readdirSync(eventsDir)

    for (const folder of eventFolders) {
        const folderPath = join(eventsDir, folder)
        const eventFiles = readdirSync(folderPath).filter(
            file => file.endsWith('.ts') || file.endsWith('.js')
        )

        for (const file of eventFiles) {
            const filePath = join(folderPath, file)

            const { default: event } = await import(filePath) as { default: BotEvent }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args))
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args))
            }
        }
    }
}