import { Client, GatewayIntentBits } from "discord.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

//commands import
import { BusinessCommands } from "./commands/BusinessCommands.js";
import { TutorialCommands } from "./commands/TutorialCommands.js";
import { startRevenuePerHourHandler } from "./commands/persistent/revenuePerHour.js";

//data import
import { EmployeeData } from "./models/EmployeeData.js";
import { EquipmentData } from "./models/EquipmentData.js";
import { BusinessData } from "./models/BusinessData.js";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const mongo = new MongoClient(process.env.MONGO_URI as string);
let users: any;

//
const allCommands = [BusinessCommands, TutorialCommands];

client.once("clientReady", async () => {
  if (!client.user) return;
  console.log(`✅ Logged in as ${client.user.tag}`);

  await mongo.connect();
  users = mongo.db(process.env.DB_NAME).collection("users");

  //revenue per hour runner
  startRevenuePerHourHandler(users);

  //Testing purpose guild register
  const guild = client.guilds.cache.get(process.env.GUILD_ID as string);
  if (guild) {
    await guild.commands.set(allCommands.map((cmd) => cmd.data.toJSON()));
    console.log(`✅ Slash commands registered for guild: ${guild.name}`);
  } else {
    console.log("❌ Guild not found in cache");
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    // Autocomplete
    if (interaction.isAutocomplete()) {
      const command = allCommands.find(
        (cmd) => cmd.data.name === interaction.commandName
      );
      if (command && command.autocomplete) {
        await command.autocomplete(interaction, users);
      }
      return;
    }

    // Select Menu
    if (interaction.isStringSelectMenu()) {
      const command = allCommands.find(
        (cmd) =>
          cmd.selectMenu && cmd.data.name === interaction.customId.split("_")[0]
      );
      if (command && command.selectMenu) {
        await command.selectMenu(interaction, users);
      }
      return;
    }

    // Chat input command
    if (!interaction.isChatInputCommand()) return;

    const command = allCommands.find(
      (cmd) => cmd.data.name === interaction.commandName
    );
    if (!command) return;

    await command.execute(interaction, users);

    // Button click interactions
  } catch (err) {
    console.error(err);
    if (interaction.isChatInputCommand() || interaction.isStringSelectMenu())
      await interaction.reply({
        content: "❌ An error occurred.",
        ephemeral: true,
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
