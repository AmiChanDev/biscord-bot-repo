import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
} from "discord.js";
import type { Command } from "../types/Command.js";

export const SelectBusiness: Command = {
  data: new SlashCommandBuilder()
    .setName("selectbusiness")
    .setDescription("Select which of your businesses to use")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The business you want to select")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async execute(interaction: ChatInputCommandInteraction, users) {
    const userId = interaction.user.id;
    const type = interaction.options.getString("type", true);

    const user = await users.findOne({ userId });

    if (!user || !user.businesses || user.businesses.length === 0) {
      return interaction.reply({
        content: "⚠️ You don’t own any businesses yet!",
        ephemeral: true,
      });
    }

    const business = user.businesses.find(
      (b: any) => b.type.toLowerCase() === type.toLowerCase()
    );

    if (!business) {
      return interaction.reply({
        content: `⚠️ You don’t own a **${type}** business!`,
        ephemeral: true,
      });
    }

    // Update active business in DB
    await users.updateOne(
      { userId },
      { $set: { activeBusinessId: business.id } }
    );

    return interaction.reply({
      content: `✅ Your active business is now: **${business.type}**`,
      ephemeral: true,
    });
  },

  async autocomplete(interaction: AutocompleteInteraction, users) {
    const userId = interaction.user.id;
    const user = await users.findOne({ userId });

    if (!user || !user.businesses) return interaction.respond([]);

    const focusedValue = interaction.options.getFocused().toLowerCase();

    const suggestions = user.businesses
      .filter((b: any) => b.type.toLowerCase().includes(focusedValue))
      .map((b: any) => ({ name: b.type, value: b.type }))
      .slice(0, 25); // max 25 options

    await interaction.respond(suggestions);
  },
};
