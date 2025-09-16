import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  EmbedBuilder,
} from "discord.js";
import type { Command } from "../types/Command.js";

// Commands
import { start } from "./business/start.js";
import { select } from "./business/select.js";
import { all } from "./business/all.js";
import { hire } from "./business/hire.js";
import { stats } from "./business/stats.js";
import { buyEquipment } from "./business/buy.js";

// Business Data
import { BusinessData } from "../models/BusinessData.js";
import { EmployeeData } from "../models/EmployeeData.js";
import { EquipmentData } from "../models/EquipmentData.js";

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
            .setName("role")
            .setDescription("Select which employee to hire")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("buy")
        .setDescription("Buy equipment for your selected business")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Select equipment to buy")
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

    const context = { users, user, BusinessData };

    switch (subcommand) {
      case "start":
        return start(interaction, context);
      case "select":
        return select(interaction, context);
      case "stats":
        return stats(interaction, context);
      case "hire":
        return hire(interaction, context);
      case "buy":
        return buyEquipment(interaction, context);
      case "all":
        return all(interaction, context);
    }
  },

  async autocomplete(interaction: AutocompleteInteraction, users) {
    const subcommand = interaction.options.getSubcommand();
    const userId = interaction.user.id;
    const user = await users.findOne({ userId });
    if (!user) return interaction.respond([]);

    const focused = interaction.options.getFocused().toLowerCase();
    const activeBusiness = user.businesses.find(
      (b: any) => b.id === user.activeBusinessId
    );
    if (!activeBusiness) return interaction.respond([]);

    if (subcommand === "hire") {
      const employees = EmployeeData[activeBusiness.type] || [];
      return interaction.respond(
        employees
          .filter((e: any) => e.role.toLowerCase().includes(focused))
          .map((e: any) => ({ name: e.role, value: e.role }))
          .slice(0, 25)
      );
    }

    if (subcommand === "buy") {
      const equipments = EquipmentData[activeBusiness.type] || [];
      return interaction.respond(
        equipments
          .filter((eq: any) => eq.name.toLowerCase().includes(focused))
          .map((eq: any) => ({ name: eq.name, value: eq.name }))
          .slice(0, 25)
      );
    }

    if (subcommand === "select" || subcommand === "stats") {
      return interaction.respond(
        user.businesses
          .filter((b: any) => b.type.toLowerCase().includes(focused))
          .map((b: any) => ({ name: b.type, value: b.type }))
          .slice(0, 25)
      );
    }

    return interaction.respond([]);
  },
};
