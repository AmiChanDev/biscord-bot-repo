import { Client, GatewayIntentBits } from "discord.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

//commands import
import { StartBusiness } from "./commands/startBusiness.js";
import { SelectBusiness } from "./commands/selectBusiness.js";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const mongo = new MongoClient(process.env.MONGO_URI as string);
let users: any;

//
const allCommands = [StartBusiness, SelectBusiness];

client.once("ready", async () => {
  if (!client.user) return;
  console.log(`✅ Logged in as ${client.user.tag}`);

  await mongo.connect();
  users = mongo.db(process.env.DB_NAME).collection("users");

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
    if (interaction.isAutocomplete()) {
      const command = allCommands.find(
        (cmd) => cmd.data.name === interaction.commandName
      );
      if (command && command.autocomplete) {
        await command.autocomplete(interaction, users);
      }
      return;
    }

    if (!interaction.isChatInputCommand()) return;

    const command = allCommands.find(
      (cmd) => cmd.data.name === interaction.commandName
    );
    if (!command) return;

    await command.execute(interaction, users);
  } catch (err) {
    console.error(err);
    if (interaction.isChatInputCommand())
      await interaction.reply({
        content: "❌ An error occurred.",
        ephemeral: true,
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
