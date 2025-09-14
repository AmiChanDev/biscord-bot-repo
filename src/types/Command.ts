import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type {
  AutocompleteInteraction,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

export interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (
    interaction: ChatInputCommandInteraction,
    users: any
  ) => Promise<any>;
  autocomplete?: (
    interaction: AutocompleteInteraction,
    users: any
  ) => Promise<void>; // optional
}
