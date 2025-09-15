import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  EmbedBuilder,
} from "discord.js";
import type { Command } from "../types/Command.js";

//commands
import { start } from "./business/start.js";
import { select } from "./business/select.js";
import { stats } from "./business/stats.js";
import { all } from "./business/all.js";
import { hire } from "./business/hire.js";

export const BusinessCommands: Command = {
  data: new SlashCommandBuilder()
    .setName("business")
    .setDescription("Manage your businesses")

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
    .addSubcommand((sub) =>
      sub
        .setName("hire")
        .setDescription("Hire employees for your selected business")
        .addStringOption((option) =>
          option
            .setName("id")
            .setDescription("Select which employee to hire")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("all").setDescription("View all your businesses")
    ),

  async execute(interaction: ChatInputCommandInteraction, users) {
    const subcommand = interaction.options.getSubcommand();
    const userId = interaction.user.id;

    let user = await users.findOne({ userId });
    if (!user) {
      user = { userId, activeBusinessId: null, businesses: [] };
      if (subcommand === "start") {
        await users.insertOne(user);
      } else {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("⚠️ No Businesses Found")
              .setDescription(
                "You don’t own any businesses yet! Start with a **Cafe**."
              )
              .setColor(0xff0000),
          ],
        });
      }
    }

    switch (subcommand) {
      case "start":
        return start(interaction, users, user);
      case "select":
        return select(interaction, users, user);
      case "stats":
        return stats(interaction, users, user);
      case "hire":
        return hire(interaction, users, user);
      case "all":
        return all(interaction, users, user);
    }
  },

  async autocomplete(interaction: AutocompleteInteraction, users) {
    const userId = interaction.user.id;
    const user = await users.findOne({ userId });
    if (!user?.businesses) return interaction.respond([]);

    const focused = interaction.options.getFocused().toLowerCase();
    const suggestions = user.businesses
      .filter((b: any) => b.type.toLowerCase().includes(focused))
      .map((b: any) => ({ name: b.type, value: b.type }))
      .slice(0, 25);

    await interaction.respond(suggestions);
  },
};
