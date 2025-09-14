import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  EmbedBuilder,
  MessageFlags,
} from "discord.js";
import type { Command } from "../types/Command.js";
import { randomUUID } from "crypto";

export const BusinessCommands: Command = {
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
    )
    // See the stats of the selected business
    .addSubcommand((sub) =>
      sub
        .setName("stats")
        .setDescription("See the stats of your active business")
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("Select which business to view stats for")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    // Hire employees
    .addSubcommand((sub) =>
      sub
        .setName("hire")
        .setDescription("hire employees for your selected business")
        .addStringOption((option) =>
          option
            .setName("id")
            .setDescription("Select which employee to hire")
            .setRequired(true)
            .setAutocomplete(true)
        )
    ),

  async execute(interaction: ChatInputCommandInteraction, users) {
    const subcommand = interaction.options.getSubcommand();
    const userId = interaction.user.id;

    // Get or initialize user profile
    let user = await users.findOne({ userId });
    if (!user) {
      // initialize empty profile if starting
      if (subcommand === "start") {
        user = {
          userId,
          activeBusinessId: null,
          businesses: [],
        };
        await users.insertOne(user);
      } else {
        // block other commands
        const embed = new EmbedBuilder()
          .setTitle("⚠️ No Businesses Found")
          .setDescription(
            "You don’t own any businesses yet! Start with a **Cafe**."
          )
          .setColor(0xff0000);

        return interaction.reply({
          embeds: [embed],
          // flags: MessageFlags.Ephemeral,
        });
      }
    }

    // ---------------- START ----------------
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
        const embed = new EmbedBuilder()
          .setTitle("⚠️ Insufficient Funds")
          .setDescription(
            `You need **$${requiredBalance}** in your active business to unlock the **${type}**!`
          )
          .setColor(0xffa500);

        return interaction.reply({
          embeds: [embed],
          // flags: MessageFlags.Ephemeral,
        });
      }

      if (user.businesses.length === 0 && type !== "Cafe") {
        const embed = new EmbedBuilder()
          .setTitle("⚠️ First Business Restriction")
          .setDescription("Your first business must be a **Cafe**!")
          .setColor(0xff0000);

        return interaction.reply({
          embeds: [embed],
          // flags: MessageFlags.Ephemeral,
        });
      }

      const hasBusiness = user.businesses.some((b: any) => b.type === type);
      if (hasBusiness) {
        const embed = new EmbedBuilder()
          .setTitle("⚠️ Already Owned")
          .setDescription(`You already own a **${type}** business!`)
          .setColor(0xffa500);

        return interaction.reply({
          embeds: [embed],
          // flags: MessageFlags.Ephemeral,
        });
      }

      // Create new business
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

      await users.updateOne({ userId }, { $push: { businesses: newBusiness } });

      if (!user.activeBusinessId) {
        await users.updateOne(
          { userId },
          { $set: { activeBusinessId: newBusiness.id } }
        );
      }

      const embed = new EmbedBuilder()
        .setTitle("🎉 Business Started!")
        .setDescription(`You successfully started a **${type}**!`)
        .setColor(0x00ff00);

      return interaction.reply({ embeds: [embed] });
    }

    // ---------------- SELECT ----------------
    if (subcommand === "select") {
      const type = interaction.options.getString("type", true);

      const business = user.businesses.find(
        (b: any) => b.type.toLowerCase() === type.toLowerCase()
      );

      if (!business) {
        const embed = new EmbedBuilder()
          .setTitle("⚠️ Business Not Found")
          .setDescription(`You don’t own a **${type}** business!`)
          .setColor(0xff0000);

        return interaction.reply({
          embeds: [embed],
          // flags: MessageFlags.Ephemeral,
        });
      }

      await users.updateOne(
        { userId },
        { $set: { activeBusinessId: business.id } }
      );

      const embed = new EmbedBuilder()
        .setTitle("✅ Business Selected")
        .setDescription(`Your active business is now **${business.type}**`)
        .setColor(0x00ff00);

      return interaction.reply({
        embeds: [embed],
        // flags: MessageFlags.Ephemeral,
      });
    }

    // ---------------- STATS ----------------
    if (subcommand === "stats") {
      const type = interaction.options.getString("type", true);

      const business = user.businesses.find(
        (b: any) => b.type.toLowerCase() === type.toLowerCase()
      );

      if (!business) {
        const embed = new EmbedBuilder()
          .setTitle("⚠️ Business Not Found")
          .setDescription(`You don’t own a **${type}** business!`)
          .setColor(0xff0000);

        return interaction.reply({
          embeds: [embed],
          // flags: MessageFlags.Ephemeral,
        });
      }

      const embed = new EmbedBuilder()
        .setTitle(`📊 ${business.type} Stats`)
        .setColor(0x3498db) // blue
        .addFields(
          {
            name: "💰 Balance",
            value: `$${business.balance.toLocaleString()}`,
          },
          { name: "🏆 Level", value: `${business.level}` },
          {
            name: "👥 Employees",
            value: `${business.employees}`,
          },
          {
            name: "⚙️ Equipment",
            value: `${business.equipment}`,
          },
          {
            name: "📊 Revenue",
            value: `$${business.revenue.toLocaleString()}`,
          },
          {
            name: "⏱️ Last Collected",
            value: business.lastCollect
              ? `<t:${Math.floor(
                  new Date(business.lastCollect).getTime() / 1000
                )}:R>`
              : "Not collected yet",
            inline: false,
          }
        )
        .setFooter({ text: `Owner: ${interaction.user.username}` })
        .setTimestamp();

      return interaction.reply({
        embeds: [embed],
        // flags: MessageFlags.Ephemeral,
      });
    }

    // ---------------- Hire ----------------
    if (subcommand === "hire") {
      const id = interaction.options.getString("id", true);
    }
    //
  },

  //autocomplete handler
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
