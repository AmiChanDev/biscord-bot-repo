import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { UserData } from "../../types/User.js";

export const stats = async (
  interaction: ChatInputCommandInteraction,
  users: any,
  user: UserData
) => {
  const type = interaction.options.getString("type", true);

  const business = user.businesses.find(
    (b: any) => b.type.toLowerCase() === type.toLowerCase()
  );

  if (!business) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Business Not Found")
          .setDescription(`You don’t own a **${type}** business!`)
          .setColor(0xff0000),
      ],
    });
  }

  const embed = new EmbedBuilder()
    .setTitle(`📊 ${business.type} Stats`)
    .setColor(0x3498db)
    .addFields(
      { name: "Balance", value: `💰 $${business.balance.toLocaleString()}` },
      { name: "Level", value: `🏆 ${business.level}` },
      { name: "Employees", value: `👥 ${business.employees}` },
      { name: "Equipment", value: `⚙️ ${business.equipment}` },
      { name: "Revenue", value: `📊 $${business.revenue.toLocaleString()}` },
      {
        name: "Last Collected",
        value: business.lastCollect
          ? `⏱️ <t:${Math.floor(
              new Date(business.lastCollect).getTime() / 1000
            )}:R>`
          : "Not collected yet",
      }
    )
    .setFooter({ text: `Owner: ${interaction.user.username}` })
    .setTimestamp();

  return interaction.reply({ embeds: [embed] });
};
