import { BotClient } from '../../core/Client'

export interface BotEvent {
    name: string
    once?: boolean
    execute: (client: BotClient, ...args: any[]) => void | Promise<void>
}