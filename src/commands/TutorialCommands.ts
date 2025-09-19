import {
  ChatInputCommandInteraction,
  StringSelectMenuInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
} from "discord.js";
import type { Command } from "../types/Command.js";
import { BusinessCommands } from "./BusinessCommands.js";

export const TutorialCommands: Command = {
  data: new SlashCommandBuilder()
    .setName("tutorial")
    .setDescription("View all commands categorized"),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
      content: "Select a category to view its commands:",
      components: [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: "tutorial_category",
              placeholder: "Choose a category",
              options: [
                { label: "Business", value: "business" },
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
    let components: any[] = [];

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
              "`/business buy` → Buy equipment for your active business",
            ].join("\n")
          )
          .setColor(0x3498db);

        const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId("tutorial_business_start")
            .setLabel("Start")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("tutorial_business_select")
            .setLabel("Select")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("tutorial_business_stats")
            .setLabel("Stats")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("tutorial_business_all")
            .setLabel("All")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("tutorial_business_hire")
            .setLabel("Hire")
            .setStyle(ButtonStyle.Primary)
        );

        const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId("tutorial_business_buy")
            .setLabel("Buy Equipment")
            .setStyle(ButtonStyle.Primary)
        );

        components = [row1, row2];
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

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ embeds: [embed], components });
    } else {
      await interaction.reply({ embeds: [embed], components });
    }
  },

  async buttonHandler(interaction: ButtonInteraction, users: any) {
    const parts = interaction.customId.split("_"); //id
    if (parts.length < 3) {
      return interaction.reply({
        content: "⚠️ Invalid button.",
        ephemeral: true,
      });
    }

    const subcommand = parts[2]; // start, select, stats, hire, buy, all

    // Find user's active business
    const userId = interaction.user.id;
    const user = await users.findOne({ userId });
    if (!user) {
      return interaction.reply({
        content: "⚠️ You don't have any businesses yet.",
        ephemeral: true,
      });
    }

    const activeBusiness = user.businesses.find(
      (b: any) => b.id === user.activeBusinessId
    );
    if (!activeBusiness) {
      return interaction.reply({
        content: "⚠️ You don't have an active business.",
        ephemeral: true,
      });
    }

    // Mock ChatInputCommandInteraction.options
    (interaction as any).options = {
      getString: (name: string) => {
        if (name === "type") return activeBusiness.type;
        if (name === "role" || name === "name") return null;
        return null;
      },
      getSubcommand: () => subcommand,
    };

    // Redirect to BusinessCommands
    return BusinessCommands.execute(interaction as any, users);
  },
};
