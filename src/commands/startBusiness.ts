import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import type { Command } from "../types/Command.js";

export const startBusiness: Command = {
  //command data
  data: new SlashCommandBuilder()
    .setName("startbusiness")
    .setDescription("Start your business")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Choose your business type")
        .setRequired(true)
        .addChoices(
          //business types
          { name: "Cafe", value: "Cafe" },
          { name: "Restaurant", value: "Restaurant" },
          { name: "Bakery", value: "Bakery" },
          { name: "Bookstore", value: "Bookstore" },
          { name: "Tech Shop", value: "Tech Shop" }
        )
    ),

  //command execution
  async execute(interaction: ChatInputCommandInteraction, users) {
    const userId = interaction.user.id;
    const type = interaction.options.getString("type", true);

    // If the user exists with the  
    const exists = await users.findOne({ userId });
    if (exists) return interaction.reply("You already own a business!");

    await users.insertOne({
      userId,
      balance: 0,
      business: {
        type,
        level: 1,
        employees: 1,
        equipment: 1,
        revenue: 100,
      },
      lastCollect: null,
    });

    return interaction.reply(
      `🎉 You started a ${type}! Use /collect to earn money.`
    );
  },
};
