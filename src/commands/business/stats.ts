import { EmbedBuilder, type ChatInputCommandInteraction } from "discord.js";
import type { BusinessCommandContext } from "../../types/context/BusinessCommandContext.js";

export const stats = async (
  interaction: ChatInputCommandInteraction,
  context: BusinessCommandContext
) => {
  const { user } = context;

  if (!user || !user.businesses || user.businesses.length === 0) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ No Businesses Found")
          .setDescription("You don’t own any businesses yet!")
          .setColor(0xff0000),
      ],
    });
  }

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

  const totalIncome = business.revenue || 0;
  const totalSpent = business.revenue || 0;
  const totalEmployees = business.hiredEmployees?.length || 0;
  const totalEquipment = business.boughtEquipments?.length || 0;

  const embed = new EmbedBuilder()
    .setTitle(`📊 ${business.type} Summary`)
    .setColor(0x3498db)
    .setDescription(
      [
        `💰 Total Income Made: $${totalIncome.toLocaleString()}`,
        `💸 Total Money Spent: $${totalSpent.toLocaleString()}`,
        ``,
        `👨‍🍳 Employees Hired: ${totalEmployees}`,
        totalEmployees
          ? business.hiredEmployees.map((e: any) => `- ${e.role}`).join("\n")
          : "",
        ``,
        `⚙️ Equipment Bought: ${totalEquipment}`,
        totalEquipment
          ? business.boughtEquipments
              .map((eq: any) => `- ${eq.name}`)
              .join("\n")
          : "",
        ``,
        `⏱️ Last Collected: ${
          business.lastCollect
            ? `<t:${Math.floor(
                new Date(business.lastCollect).getTime() / 1000
              )}:R>`
            : "Not collected yet"
        }`,
      ].join("\n")
    )
    .setFooter({ text: `Owner: ${interaction.user.username}` })
    .setTimestamp();

  return interaction.reply({ embeds: [embed] });
};
