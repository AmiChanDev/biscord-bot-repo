import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import type { Command } from "../types/Command.js";
import { randomUUID } from "crypto";

export const StartBusiness: Command = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Start your business")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Choose your business type")
        .setRequired(true)
        .addChoices(
          { name: "Cafe", value: "Cafe" },
          { name: "Restaurant", value: "Restaurant" },
          { name: "Bakery", value: "Bakery" },
          { name: "Bookstore", value: "Bookstore" },
          { name: "Tech Shop", value: "Tech Shop" }
        )
    ),

  async execute(interaction: ChatInputCommandInteraction, users) {
    const userId = interaction.user.id;
    const type = interaction.options.getString("type", true);

    const user = await users.findOne({ userId });

    const newBusiness = {
      id: randomUUID(),
      type,
      level: 1,
      employees: 1,
      equipment: 1,
      revenue: 100,
      balance: 0,
      lastCollect: null,
    };

    if (!user) {
      // User has no businesses yet
      await users.insertOne({
        userId,
        businesses: [newBusiness],
      });
      return interaction.reply(`You started a new **${type}**! 🎉 `);
    }

    // Check if the user already has this type of business
    const hasBusiness = user.businesses?.some((b: any) => b.type === type);

    if (hasBusiness) {
      return interaction.reply(`You already own a **${type}** business! ⚠️ `);
    }

    // Add the new business
    await users.updateOne({ userId }, { $push: { businesses: newBusiness } });
    return interaction.reply(`You started a new **${type}** business! 🎉`);
  },
};
