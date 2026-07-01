import { Client, ClientOptions, Collection } from 'discord.js'
import { BotConfig } from '../config/config'

export class BotClient extends Client {
    public config: BotConfig
    public commands: Collection<string, any> = new Collection()

    constructor(options: ClientOptions, config: BotConfig) {
        super(options)
        this.config = config
    }
}