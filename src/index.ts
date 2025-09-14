import { Client, GatewayIntentBits } from "discord.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

//commands import
import { StartBusiness } from "./commands/startBusiness.js";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const mongo = new MongoClient(process.env.MONGO_URI as string);
let users: any;

const allCommands = [StartBusiness];

client.once("ready", async () => {
  if (!client.user) return;
  console.log(`✅ Logged in as ${client.user.tag}`);

  await mongo.connect();
  users = mongo.db("businessBot").collection("users");

  // Register GLOBAL slash commands
  const app = client.application;
  if (app) {
    await app.commands.set([]);
    console.log("✅ Global slash commands cleared");
  }
  if (app) {
    await app.commands.set(allCommands.map((cmd) => cmd.data.toJSON()));
    console.log("✅ Global slash commands registered");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = allCommands.find(
    (cmd) => cmd.data.name === interaction.commandName
  );
  if (!command) return;

  try {
    await command.execute(interaction, users);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "❌ An error occurred.",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
