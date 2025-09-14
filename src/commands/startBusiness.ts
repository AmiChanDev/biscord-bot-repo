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

    // Determine unlock requirements
    const unlocks: Record<string, number> = {
      Cafe: 0,
      Restaurant: 5000,
      Bakery: 10000,
      Bookstore: 20000,
      "Tech Shop": 40000,
    };
    const requiredBalance = unlocks[type] ?? 0;

    // Find the current active business
    let activeBusinessBalance = 0;
    if (user && user.activeBusinessId) {
      const activeBusiness = user.businesses.find(
        (b: any) => b.id === user.activeBusinessId
      );
      if (activeBusiness) activeBusinessBalance = activeBusiness.balance;
    }

    // Check unlock requirement from active business
    if (
      user &&
      requiredBalance > 0 &&
      activeBusinessBalance < requiredBalance
    ) {
      return interaction.reply(
        `⚠️ You need $${requiredBalance} to unlock the **${type}** business!`
      );
    }

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
      if (type !== "Cafe") {
        return interaction.reply("⚠️ Your first business must be a **Cafe**!");
      }

      // First business is Cafe, insert user
      await users.insertOne({
        userId,
        businesses: [newBusiness],
        activeBusinessId: newBusiness.id, // set first business as active
      });
      return interaction.reply(
        `🎉 You started your first business: **${type}**!`
      );
    }

    // Prevent duplicate businesses
    const hasBusiness = user.businesses?.some((b: any) => b.type === type);
    if (hasBusiness) {
      return interaction.reply(`⚠️ You already own a **${type}** business!`);
    }

    // Add the new business
    await users.updateOne({ userId }, { $push: { businesses: newBusiness } });

    return interaction.reply(`🎉 You started a new business: **${type}**!`);
  },
};
