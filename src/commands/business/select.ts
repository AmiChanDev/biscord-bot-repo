import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { BusinessCommandContext } from "../../types/context/BusinessCommandContext.js";

export const select = async (
  interaction: ChatInputCommandInteraction,
  context: BusinessCommandContext
) => {
  const { user, users, BusinessData } = context;
  const type = interaction.options.getString("type", true);

  // Check if the user owns this business
  const business = user.businesses.find(
    (b: any) => b.type.toLowerCase() === type.toLowerCase()
  );

  if (!business) {
    const unlockCost = BusinessData.unlocks[type] ?? 0;
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Business Not Found")
          .setDescription(
            unlockCost > 0
              ? `You don’t own a **${type}** business yet! You can unlock it for **$${unlockCost}**.`
              : `You don’t own a **${type}** business yet!`
          )
          .setColor(0xff0000),
      ],
      ephemeral: true,
    });
  }

  // Set as active business
  await users.updateOne(
    { userId: user.userId },
    { $set: { activeBusinessId: business.id } }
  );

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("✅ Business Selected")
        .setDescription(`Your active business is now **${business.type}**`)
        .setColor(0x00ff00),
    ],
  });
};
