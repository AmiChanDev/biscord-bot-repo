import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  ButtonInteraction,
} from "discord.js";
import type {
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  StringSelectMenuInteraction,
} from "discord.js";

export interface Command {
  data:
    | SlashCommandBuilder
    | SlashCommandOptionsOnlyBuilder
    | SlashCommandSubcommandsOnlyBuilder;

  execute: (
    interaction: ChatInputCommandInteraction,
    users: any
  ) => Promise<any>;

  autocomplete?: (
    interaction: AutocompleteInteraction,
    users: any
  ) => Promise<void>;

  selectMenu?: (
    interaction: StringSelectMenuInteraction,
    users: any
  ) => Promise<void>;

  buttonHandler?: (interaction: ButtonInteraction, users: any) => Promise<void>;
}
