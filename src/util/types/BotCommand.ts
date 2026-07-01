import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export interface BotCommand {
    data: SlashCommandBuilder
    ownerOnly?: boolean
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}