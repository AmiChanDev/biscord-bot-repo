import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { UserData } from "../../types/User.js";

export const all = async (
  interaction: ChatInputCommandInteraction,
  users: any,
  user: UserData
) => {
  if (user.businesses.length === 0) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ No Businesses Found")
          .setDescription("You don’t own any businesses yet!")
          .setColor(0xff0000),
      ],
    });
  }

  const list = user.businesses
    .map((b: any, i: number) => `${i + 1}. **${b.type}** (💰 $${b.balance})`)
    .join("\n");

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("📋 All Businesses")
        .setDescription(list)
        .setColor(0x3498db),
    ],
  });
};
