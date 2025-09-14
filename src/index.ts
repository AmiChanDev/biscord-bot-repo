import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

//commands
import { StartBusiness } from "./commands/startBusiness.js";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const mongo = new MongoClient(process.env.MONGO_URI as string);
let users: any;

const allCommands = [StartBusiness];

//bot ready
client.once("ready", async () => {
  if (!client.user) return;
  console.log(`✅ Logged in as ${client.user.tag}`);

  await mongo.connect();
  users = mongo.db("bizcordBotDB").collection("users");

  const app = client.application;
  if (app) {
    await app.commands.set(allCommands.map((cmd) => cmd.data.toJSON()));
    console.log("✅ Global slash commands registered");
  }
});

//on client interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = allCommands.find(
    (cmd) => cmd.data.name === interaction.commandName
  );
  if (!command) return;

  try {
    await command.execute(interaction, users);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "❌ An error occurred.",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
