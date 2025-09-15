import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { UserData } from "../../types/User.js";

export const hire = async (
  interaction: ChatInputCommandInteraction,
  users: any,
  user: UserData
) => {
  const id = interaction.options.getString("id", true);

  // Placeholder: employee hiring logic
  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("👥 Hire Employees")
        .setDescription(`You selected employee ID: **${id}**`)
        .setColor(0x2ecc71),
    ],
  });
};
