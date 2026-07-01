import { Events, MessageFlags } from 'discord.js'
import { BotClient } from '../../core/Client'
import { BotEvent } from '../../util/types'

async function interactionCreate(client: BotClient, interaction: any) {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName)
        if (!command) return
        if (command.ownerOnly && interaction.user.id !== client.config.developerId) {
            await interaction.reply({
                content: `Você não tem permissão para executar esse comando.`,
                flags: MessageFlags.Ephemeral
            })
            return
        }
        await command.execute(interaction)
    }
}

export default {
  name: Events.InteractionCreate,
  once: false,
  execute: interactionCreate,
} satisfies BotEvent