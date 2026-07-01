import { readdirSync } from 'fs'
import { join } from 'path'
import { BotClient } from './Client'
import { BotCommand } from '../util/types'
import { REST, Routes } from 'discord.js'

export async function loadCommands(client: BotClient, commandsDir: string = join(__dirname, '..', 'commands')) : Promise<void> {
    const commandFolders = readdirSync(commandsDir)
    const commandsToRegister : object[] = []

    for (const folder of commandFolders) {
        const folderPath = join(commandsDir, folder)
        const commandFiles = readdirSync(folderPath).filter(
            file => file.endsWith('.ts') || file.endsWith('.js')
        )

        for (const file of commandFiles) {
            const filePath = join(folderPath, file)

            const { default: command } = await import(filePath) as { default: BotCommand }

            commandsToRegister.push(command.data.toJSON())
            client.commands.set(command.data.name, command)
        }
    }

    const rest = new REST().setToken(process.env.TOKEN!)
    const clientId : string = client.config.clientId

    if(process.env.NODE_ENV === 'development') {
        for (const guild of client.config.guildIds) {
            const data : any = await rest.put(Routes.applicationGuildCommands(clientId, guild), { body : commandsToRegister })
            console.log(`Successfully loaded ${data.length} application (/) commands in ${client.config.guildIds.length} guilds.`);
        }  
    } else {
        const data : any = await rest.put(Routes.applicationCommands(clientId), { body : commandsToRegister })
        console.log(`Successfully loaded ${data.length} application (/) commands globally.`);
    }

}
