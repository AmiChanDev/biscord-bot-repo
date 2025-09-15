import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { UserData } from "../../types/User.js";

export const select = async (
  interaction: ChatInputCommandInteraction,
  users: any,
  user: UserData
) => {
  const type = interaction.options.getString("type", true);

  const business = user.businesses.find(
    (b) => b.type.toLowerCase() === type.toLowerCase()
  );

  if (!business) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Business Not Found")
          .setDescription(`You don’t own a **${type}** business!`)
          .setColor(0xff0000),
      ],
      ephemeral: true, //  visibility
    });
  }

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
