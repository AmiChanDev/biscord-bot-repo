import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { SlashCommandOptionsOnlyBuilder } from "discord.js";

export interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (
    interaction: ChatInputCommandInteraction,
    users: any
  ) => Promise<any>;
}
