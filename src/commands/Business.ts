import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
} from "discord.js";
import type { Command } from "../types/Command.js";
import { randomUUID } from "crypto";

export const Business: Command = {
  data: new SlashCommandBuilder()
    .setName("business")
    .setDescription("Manage your businesses")

    // Start a new business
    .addSubcommand((sub) =>
      sub
        .setName("start")
        .setDescription("Start a new business")
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
        )
    )
    // Select active business
    .addSubcommand((sub) =>
      sub
        .setName("select")
        .setDescription("Select your active business")
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("Select which business to activate")
            .setRequired(true)
            .setAutocomplete(true)
        )
    ),

  async execute(interaction: ChatInputCommandInteraction, users) {
    const subcommand = interaction.options.getSubcommand();

    const userId = interaction.user.id;
    const user = await users.findOne({ userId });

    if (!user) {
      return interaction.reply({
        content: "⚠️ You don’t own any businesses yet!",
        ephemeral: true,
      });
    }

    if (subcommand === "start") {
      const type = interaction.options.getString("type", true);

      const unlocks: Record<string, number> = {
        Cafe: 0,
        Restaurant: 5000,
        Bakery: 10000,
        Bookstore: 20000,
        "Tech Shop": 40000,
      };
      const requiredBalance = unlocks[type] ?? 0;

      // Active business balance
      let activeBalance = 0;
      if (user.activeBusinessId) {
        const activeBusiness = user.businesses.find(
          (b: any) => b.id === user.activeBusinessId
        );
        if (activeBusiness) activeBalance = activeBusiness.balance;
      }

      if (requiredBalance > 0 && activeBalance < requiredBalance) {
        return interaction.reply(
          `⚠️ You need $${requiredBalance} in your current business to unlock the **${type}** business!`
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

      if (user.businesses.length === 0 && type !== "Cafe") {
        return interaction.reply("⚠️ Your first business must be a **Cafe**!");
      }

      const hasBusiness = user.businesses.some((b: any) => b.type === type);
      if (hasBusiness) {
        return interaction.reply(`⚠️ You already own a **${type}** business!`);
      }

      // Add business
      await users.updateOne({ userId }, { $push: { businesses: newBusiness } });

      // Set as active if first business
      if (!user.activeBusinessId) {
        await users.updateOne(
          { userId },
          { $set: { activeBusinessId: newBusiness.id } }
        );
      }

      return interaction.reply(`🎉 You started a new business: **${type}**!`);
    }

    if (subcommand === "select") {
      const type = interaction.options.getString("type", true);

      const business = user.businesses.find(
        (b: any) => b.type.toLowerCase() === type.toLowerCase()
      );

      if (!business) {
        return interaction.reply({
          content: `⚠️ You don’t own a **${type}** business!`,
          ephemeral: true,
        });
      }

      await users.updateOne(
        { userId },
        { $set: { activeBusinessId: business.id } }
      );

      return interaction.reply({
        content: `✅ Your active business is now: **${business.type}**`,
        ephemeral: true,
      });
    }
  },

  async autocomplete(interaction: AutocompleteInteraction, users) {
    const userId = interaction.user.id;
    const user = await users.findOne({ userId });

    if (!user || !user.businesses) return interaction.respond([]);

    const focused = interaction.options.getFocused().toLowerCase();

    const suggestions = user.businesses
      .filter((b: any) => b.type.toLowerCase().includes(focused))
      .map((b: any) => ({ name: b.type, value: b.type }))
      .slice(0, 25);

    await interaction.respond(suggestions);
  },
};
