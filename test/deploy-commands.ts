import dotenv from "dotenv";
import { REST, Routes } from "discord.js";
import { Business } from "../src/commands/BusinessCommands.js";

dotenv.config();
const commands = [Business].map((cmd) => cmd.data.toJSON());
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN as string
);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID as string,
        process.env.GUILD_ID as string
      ),
      { body: commands }
    );
    console.log("✅ Commands deployed!");
  } catch (error) {
    console.error(error);
  }
})();
