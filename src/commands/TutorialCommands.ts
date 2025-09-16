import {
  ChatInputCommandInteraction,
  StringSelectMenuInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import type { Command } from "../types/Command.js";

export const TutorialCommands: Command = {
  data: new SlashCommandBuilder()
    .setName("tutorial")
    .setDescription("View all commands categorized"),

  async execute(interaction: ChatInputCommandInteraction) {
    // Show dropdown menu for categories
    await interaction.reply({
      content: "Select a category to view its commands:",
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 3, // StringSelectMenu
              custom_id: "tutorial_category",
              placeholder: "Choose a category",
              options: [
                { label: "Business", value: "business" },
                { label: "Employees", value: "employees" },
                { label: "Equipment", value: "equipment" },
                { label: "Economy", value: "economy" },
                { label: "Help", value: "help" },
              ],
            },
          ],
        },
      ],
    });
  },

  async selectMenu(interaction: StringSelectMenuInteraction) {
    const category = interaction.values[0];
    let embed: EmbedBuilder;

    switch (category) {
      case "business":
        embed = new EmbedBuilder()
          .setTitle("🏢 Business Commands")
          .setDescription(
            [
              "`/business start` → Start a new business",
              "`/business select` → Select your active business",
              "`/business stats` → View stats of a business",
              "`/business all` → View all your businesses",
              "`/business hire` → Hire employees for your active business",
              "`/business equipment` → Buy equipment for your active business",
            ].join("\n")
          )
          .setColor(0x3498db);
        break;

      case "employees":
        embed = new EmbedBuilder()
          .setTitle("👥 Employee Commands")
          .setDescription(
            ["`/business hire` → Hire employees for your active business"].join(
              "\n"
            )
          )
          .setColor(0x1abc9c);
        break;

      case "equipment":
        embed = new EmbedBuilder()
          .setTitle("🛠️ Equipment Commands")
          .setDescription(
            [
              "`/business equipment` → Buy equipment for your active business",
            ].join("\n")
          )
          .setColor(0xe67e22);
        break;

      case "economy":
        embed = new EmbedBuilder()
          .setTitle("💰 Economy Commands")
          .setDescription(
            [
              "`/collect` → Collect revenue from your business",
              "`/balance` → Check your balance",
            ].join("\n")
          )
          .setColor(0xf1c40f);
        break;

      case "help":
        embed = new EmbedBuilder()
          .setTitle("❓ Help")
          .setDescription("`/tutorial` → Show this tutorial menu")
          .setColor(0x95a5a6);
        break;

      default:
        embed = new EmbedBuilder()
          .setTitle("⚠️ Unknown Category")
          .setDescription("Please select a valid category from the dropdown.")
          .setColor(0xff0000);
        break;
    }

    await interaction.reply({ embeds: [embed], components: [] });
  },
};
