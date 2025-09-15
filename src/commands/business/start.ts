import { EmbedBuilder, type ChatInputCommandInteraction } from "discord.js";
import { randomUUID } from "crypto";
import type { CommandContext } from "../../types/CommandContext.js";
import type { Business } from "../../types/Business.js";

export const start = async (
  interaction: ChatInputCommandInteraction,
  context: CommandContext
) => {
  const { user, users, BusinessData } = context;
  const type = interaction.options.getString("type", true);

  const requiredBalance = BusinessData.unlocks[type] ?? 0;

  // Active business balance
  let activeBalance = 0;
  if (user.activeBusinessId) {
    const activeBusiness = user.businesses.find(
      (b: Business) => b.id === user.activeBusinessId
    );
    if (activeBusiness) activeBalance = activeBusiness.balance;
  }

  // Insufficient funds check
  if (requiredBalance > 0 && activeBalance < requiredBalance) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Insufficient Funds")
          .setDescription(
            `You need **$${requiredBalance}** in your active business to unlock the **${type}**!`
          )
          .setColor(0xffa500),
      ],
    });
  }

  // First business must be Cafe
  if (user.businesses.length === 0 && type !== "Cafe") {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ First Business Restriction")
          .setDescription("Your first business must be a **Cafe**!")
          .setColor(0xff0000),
      ],
    });
  }

  // Already owns this business
  if (user.businesses.some((b: Business) => b.type === type)) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Already Owned")
          .setDescription(`You already own a **${type}** business!`)
          .setColor(0xffa500),
      ],
      ephemeral: true,
    });
  }

  // Deduct unlock cost if applicable
  if (requiredBalance > 0 && user.activeBusinessId) {
    await users.updateOne(
      { userId: user.userId, "businesses.id": user.activeBusinessId },
      { $inc: { "businesses.$.balance": -requiredBalance } }
    );
  }

  // Create new business
  const newBusiness: Business = {
    id: randomUUID(),
    type,
    level: 1,
    equipment: 1,
    revenue: 100,
    balance: 0,
    lastCollect: null,
    hiredEmployees: [],
  };

  await users.updateOne(
    { userId: user.userId },
    { $push: { businesses: newBusiness } }
  );

  // Set as active if none
  if (!user.activeBusinessId) {
    await users.updateOne(
      { userId: user.userId },
      { $set: { activeBusinessId: newBusiness.id } }
    );
  }

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("🎉 Business Started!")
        .setDescription(`You successfully started a **${type}**!`)
        .setColor(0x00ff00),
    ],
  });
};
