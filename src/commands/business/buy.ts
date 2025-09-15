import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { BusinessCommandContext } from "../../types/context/BusinessCommandContext.js";
import { EquipmentData } from "../../models/EquipmentData.js";

export const buyEquipment = async (
  interaction: ChatInputCommandInteraction,
  context: BusinessCommandContext
) => {
  const { user, users } = context;
  const equipmentName = interaction.options.getString("name", true);

  // Active business
  const activeBusiness = user.businesses.find(
    (b) => b.id === user.activeBusinessId
  );
  if (!activeBusiness) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ No Active Business")
          .setDescription("Select an active business first!")
          .setColor(0xff0000),
      ],
    });
  }

  if (!activeBusiness.boughtEquipments) activeBusiness.boughtEquipments = [];

  const equipments = EquipmentData[activeBusiness.type];
  if (!equipments) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Invalid Business Type")
          .setDescription("No equipment found for this business type.")
          .setColor(0xff0000),
      ],
    });
  }

  const equipment = equipments.find((e) => e.name === equipmentName);
  if (!equipment) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Invalid Equipment")
          .setDescription(
            `Equipment **${equipmentName}** does not exist for this business.`
          )
          .setColor(0xff0000),
      ],
    });
  }

  // Check if already bought
  if (activeBusiness.boughtEquipments.some((e) => e.name === equipment.name)) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Already Bought")
          .setDescription(`You have already bought **${equipment.name}**.`)
          .setColor(0xffa500),
      ],
    });
  }

  // Check balance
  if (activeBusiness.balance < equipment.cost) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Insufficient Balance")
          .setDescription(
            `You need **$${equipment.cost}** to buy **${equipment.name}**, but your business only has **$${activeBusiness.balance}**.`
          )
          .setColor(0xffa500),
      ],
    });
  }

  // Deduct cost and buy
  activeBusiness.balance -= equipment.cost;
  activeBusiness.boughtEquipments.push(equipment);

  // Update equipment boost
  activeBusiness.equipmentBoost = activeBusiness.boughtEquipments.reduce(
    (sum, e) => sum + e.boost,
    0
  );

  // Update revenue
  activeBusiness.revenue =
    100 + (activeBusiness.employeeBoost || 0) + activeBusiness.equipmentBoost;

  // Save to database
  await users.updateOne(
    { userId: user.userId, "businesses.id": activeBusiness.id },
    { $set: { "businesses.$": activeBusiness } }
  );

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("⚙️ Equipment Bought")
        .setDescription(`You successfully bought **${equipment.name}**!`)
        .addFields(
          {
            name: "Revenue Boost",
            value: `💰 +${equipment.boost}`,
            inline: true,
          },
          {
            name: "Total Equipments",
            value: `🏢 ${activeBusiness.boughtEquipments.length}`,
            inline: true,
          }
        )
        .setColor(0x2ecc71),
    ],
  });
};
