import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { CommandContext } from "../../types/CommandContext.js";

export const stats = async (
  interaction: ChatInputCommandInteraction,
  context: CommandContext
) => {
  const { user } = context;
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

  const employeeList = business.hiredEmployees.length
    ? business.hiredEmployees.map((e: any) => e.role).join(", ")
    : "No employees hired";

  const embed = new EmbedBuilder()
    .setTitle(`📊 ${business.type} Stats`)
    .setColor(0x3498db)
    .addFields(
      { name: "Balance", value: `💰 $${business.balance.toLocaleString()}` },
      { name: "Level", value: `🏆 ${business.level}` },
      //👥
      {
        name: "Employees",
        value: `${
          business.hiredEmployees.length
            ? business.hiredEmployees.map((e: any) => e.role).join("\n")
            : "No employees hired"
        }`,
      },
      //⚙️
      { name: "Equipment", value: `${business.equipment}` },
      {
        name: "Revenue (Employee + Equipment)",
        value: `📊 $${business.revenue} + (${business.employeeBoost} + ${business.equipmentBoost})`,
      },
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
