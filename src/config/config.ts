if (!process.env.TOKEN) throw new Error('TOKEN não definido no .env')

export const config = {
    developerId: '',
    clientId: '',
    guildIds: [""],
    prefixes: ['./'],
} as const

export type BotConfig = typeof config