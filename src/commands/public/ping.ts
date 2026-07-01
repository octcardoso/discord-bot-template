import { BotCommand } from '../../util/types'
import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js'

async function ping(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
        content: `🏓 Pong! \`${interaction.client.ws.ping}ms\``,
        flags: MessageFlags.Ephemeral
    })
}

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Verifica latência do bot'),
    ownerOnly: false,
    execute: ping
} satisfies BotCommand