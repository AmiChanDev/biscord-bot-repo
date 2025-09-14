import { Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}`);
  }
});

//slash commands
client.on("ready", async () => {
  const commands = [
    new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with Pong!"),
  ].map((cmd) => cmd.toJSON());

  if (client.application) {
    await client.application.commands.set(commands);
    console.log("Slash commands registered");
  }
});

//Handle slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(process.env.DISCORD_TOKEN);
