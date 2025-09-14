import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  if (!client.user) return;
  console.log(`✅ Logged in as ${client.user.tag}`);

  try {
    // Clear global commands
    await client.application?.commands.set([]);
    console.log("✅ Cleared all global commands");

    // Fetch all guilds and clear their commands
    const guilds = await client.guilds.fetch();
    for (const [guildId, guild] of guilds) {
      const g = await guild.fetch();
      await g.commands.set([]);
      console.log(`✅ Cleared commands for guild: ${g.name}`);
    }

    console.log("🎉 All commands cleared successfully!");
  } catch (err) {
    console.error("❌ Error clearing commands:", err);
  } finally {
    client.destroy();
  }
});

client.login(process.env.DISCORD_TOKEN);
